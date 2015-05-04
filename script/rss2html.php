<?php
/* Copyright (c) 2010 Obeo.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     Obeo - initial API and implementation
 */
// URL of the feed that is to be converted. Can be either URL or absolute URI
$feedURL = "http://www.bsi-software.com/scout/?feed=rss2";

// Limits the number of items that is to be displayed to the first n
$limitItem = 5;

// Limits the length of the displayed items' title to the first n characters
// -1 means the title length will not be limited
$limitTitleLength = -1;

// Limits the length of the displayed items' content to the first n characters
// -1 means the description will not be limited
// 0 Disables the description altogether
$limitDescriptionLength = 0;

// See http://www.php.net/manual/en/function.date.php for date formats
// Here, we use "June 1st, 2010" for example
$dateFormat = "F jS, Y";

class RSS2HTML {
	var $readError;

	function convert() {
		GLOBAL $limitItem;
		GLOBAL $limitTitleLength;
		GLOBAL $limitDescriptionLength;
		GLOBAL $dateFormat;

		$result = "";
		
	 	//Get the feed
		$xmlString = @file_get_contents("http://www.bsi-software.com/scout/?feed=rss2", true);  		
		if ($xmlString === FALSE) {
			return "Error by reading the RSS feed";
		}

		$xmlParser = xml_parser_create();
		$rssParser = new RSSParser();
		xml_set_object($xmlParser, $rssParser);
		xml_set_element_handler($xmlParser, "startElement", "endElement");
		xml_set_character_data_handler($xmlParser, "characterData");
		$parseResult = xml_parse($xmlParser, $xmlString, TRUE);
				
		if ($parseResult == 0) {
			$result = xml_error_string(xml_get_error_code($xmlParser));
			$result .= "\nat ".xml_get_current_line_number($xmlParser);
			$result .= ":".xml_get_current_column_number($xmlParser);
			return $result;
		}

		$itemCount = min($limitItem, count($rssParser->items));
		
		if ($itemCount > 0) {			
			$result .= "<ul>\n";
			for ($i = 0; $i < $itemCount; $i++) {
				$item = $rssParser->items[$i];				
				
				$itemTitle = $this->limitLength($item->title, $limitTitleLength);
				$itemPubDate = date($dateFormat, $item->pubDate_time);
				
				$result .= "<li>\n";
				$result .= "<a href='$item->link' display='block'>$itemTitle</a><br/>\n";
				$result .= "<span class='posted'>$itemPubDate</span>\n";
				$result .= "</li>\n";
			}
			$result .= "</ul>\n";
		}
		return $result;
	}

	/*
	 * Limit the length of the given HTML String to the given number of characters. Take note that this will strip all html information
	 * out of the text and only return the raw text itself (save for xml entities).
	 */
	function limitLength($initialValue, $limit = -1) {
		if ($limit == -1 || strlen($initialValue) <= $limit) {
			return $initialValue;
		}

		$result = "";
		$pruneChar = FALSE;
		for ($i = 0; $i < strlen($initialValue) && strlen($result) <= $limit; $i++) {
			if (!$pruneChar && $initialValue[$i] == "<") {
				$pruneChar = TRUE;
			} elseif ($pruneChar && $initialValue[$i] == ">") {
				$pruneChar = FALSE;
			} else if (!$pruneChar) {
				$result .= $initialValue[$i];
			}
		}

		$lastSpace = strrchr($result, ' ');
		if ($lastSpace != FALSE) {
			$result = substr($result, 0, -strlen($lastSpace));
			$result .= " [...]";
		}

		return $result;
	}
}

class RSSParser {
	var $tag = "";
	var $currentItem = NULL;
	var $insideChannel = FALSE;
	var $insideItem = FALSE;

	var $feed;
	var $items = Array();

	function startElement($parser, $tagName, $attrs) {
		$this->tag = $tagName;
		if ($tagName == "ITEM") {
			$this->insideItem = TRUE;
			$this->currentItem = new RSSItem();
		} elseif ($tagName == "CHANNEL") {
			$this->insideChannel = TRUE;
			$this->feed = new Feed();
		}
	}

	function endElement($parser, $tagName) {
		$this->tag = "";
		if ($tagName == "ITEM") {
			$this->currentItem->pubDate = trim($this->currentItem->pubDate);
			$this->currentItem->title = trim($this->currentItem->title);
			$this->currentItem->description = trim($this->currentItem->description);
			$this->currentItem->link = trim($this->currentItem->link);
			$this->currentItem->author = trim($this->currentItem->author);

			$this->currentItem->pubDate_time = strtotime($this->currentItem->pubDate);

			$this->items[] = $this->currentItem;

			$this->insideItem = FALSE;
		} elseif ($tagName == "CHANNEL") {
			$this->feed->title = trim($this->feed->title);
			$this->feed->link = trim($this->feed->link);

			$this->insideChannel = FALSE;
		}
	}

	function characterData($parser, $data) {
		if ($data != NULL && $data != "" && ($this->insideItem || $this->insideChannel)) {
			switch ($this->tag) {
				case "TITLE":
					if ($this->insideItem) {
						$this->currentItem->title .= $data;
					} else if ($this->insideChannel) {
						$this->feed->title .= $data;
					}
					break;

				case "DESCRIPTION":
					if ($this->insideItem) {
						$this->currentItem->description .= $data;
					}
					break;

				case "LINK":
					if ($this->insideItem) {
						$this->currentItem->link .= $data;
					} else if ($this->insideChannel) {
						$this->feed->link .= $data;
					}
					break;

				case "PUBDATE":
					$this->currentItem->pubDate .= $data;
					break;

				case "AUTHOR":
					$this->currentItem->author .= $data;
					break;

				default:
			}
		}
	}
}

class Feed {
	var $title = "";
	var $link = "";
}

class RSSItem {
	var $title = "";
	var $description = "";
	var $link = "";
	var $pubDate = "";
	var $pubDate_time = 0;
	var $author = "";
}
?>