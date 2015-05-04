<?php
/*******************************************************************************
 * Copyright (c) 2009 Eclipse Foundation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *
 *******************************************************************************/
  define("PATH_SCOUT_HOME", "../");
  include_once(PATH_SCOUT_HOME."constants.php");

  # Eclipse Webpages Framework
  require_once($_SERVER['DOCUMENT_ROOT'] . "/eclipse.org-common/system/app.class.php");
  require_once($_SERVER['DOCUMENT_ROOT'] . "/eclipse.org-common/system/nav.class.php");
  require_once($_SERVER['DOCUMENT_ROOT'] . "/eclipse.org-common/system/menu.class.php");
  $App = new App();
  $Nav = new Nav();
  $Menu = new Menu();
  include($App->getProjectCommon());

  # Begin: page-specific settings.  Change these.
  $pageTitle 	= "Eclipse Scout - Support";
  $pageKeywords	= "support, community, eclipse, scout";
  $pageAuthor	= "BSI Business System Integration AG";

  # Paste your HTML content between the EOHTML markers!
  ob_start();
  ?>
	<div id="midcolumn">
		<h1>Get Support</h1>
		<p>Are you looking for help with Eclipse Scout?
<?php /*	<ul>
				<li><a href="#community">Eclipse Scout Community Support</a></li>
		</ul> */ ?>
		</p>

		<div style="clear: both;" class="homeitem3col" id="community">
			<h3>Eclipse Scout Community Support</h3>
			<p>There are different ways to get support from the community.
			Before you ask questions in the forum or open new bugs it is considered polite to do the following:
			</p>

			<ol>
			  <li>Check the <a href="<?php echo URL_WIKI; ?>">Scout Wiki</a> for information</li>
			  <li>Find relevant posts/answers in the <a href="<?php echo URL_SCOUT_FORUM; ?>">Scout Forum</a></li>
			  <li>Verify the <a href="<?php echo URL_BUGZILLA; ?>">Scout Bugzilla</a> for open bugs/enhancements</li>
			</ol>

            <p>If your issue is not already addressed properly, feel free to:</p>

            <ul>
			  <li>Ask your question in the <a href="<?php echo URL_SCOUT_FORUM; ?>">Eclipse Scout Forum</a></li>
			  <li>Create a new bug on <a href="<?php echo URL_BUGZILLA; ?>">Eclipse Scout Bugzilla</a></li>
			</ul>
		</div>
        <div style="clear: both;" class="homeitem3col" id="support">
            <h3>Eclipse Scout Professional Support</h3>
            <p>Scout has been developed at <a href="<?php echo URL_BSI; ?>">BSI</a> since 2001.
            In 2011, BSI has published Scout under the Eclipse Public License.
            </p>
            <p>If you plan to prototype Eclipse Scout applications,
            ask <a href="<?php echo URL_BSI; ?>">BSI</a> for training and consulting to maximize your value.
            When your organization decides for Scout, you want to rely on the experience provided by our <a href="<?php echo URL_BSI_SCOUT; ?>">Scout experts at BSI</a>.
            For further information please contact <a href="mailto:scout@bsi-software.com">scout@bsi-software.com</a>.
            </p>
        </div>
	</div>

  <?php
  $html = ob_get_clean();

  # Generate the web page
  $App->generatePage('Nova', $Menu, $Nav, $pageAuthor, $pageKeywords, $pageTitle, $html);
  ?>