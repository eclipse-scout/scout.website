<?php
if(defined(PATH_SCOUT_HOME)) {
	define("PATH_SCOUT_HOME", "./");
}

define("TIME_ZONE", "Europe/Berlin");

define("REPOSITORY_OVERVIEW", "http://download.eclipse.org/scout/repositoryOverview.xml");

define("SOURCE_REPOSITORY", "http://git.eclipse.org/c/scout");
define("INDIGO_UPDATE_SITE", "http://download.eclipse.org/release/indigo");
define("JUNO_UPDATE_SITE", "http://download.eclipse.org/releases/juno");
define("KEPLER_UPDATE_SITE", "http://download.eclipse.org/releases/kepler");

$ECLIPSE_VERSIONS = array();
$ECLIPSE_VERSIONS[] = array("version" => 3.5, "name" => "Eclipse Galileo", "name_info" => "(older version)", "url" => "http://www.eclipse.org/downloads/packages/release/galileo/sr2");
$ECLIPSE_VERSIONS[] = array("version" => 3.6, "name" => "Eclipse Helios", "name_info" => "(older version)", "url" => "http://www.eclipse.org/downloads/packages/release/helios/sr2");
$ECLIPSE_VERSIONS[] = array("version" => 3.7, "name" => "Eclipse Indigo", "name_info" => "(older version)", "url" => "http://www.eclipse.org/downloads/packages/release/indigo/sr2");
$ECLIPSE_VERSIONS[] = array("version" => 4.2, "name" => "Eclipse Juno", "name_info" => "(older version)", "url" => "http://www.eclipse.org/downloads/packages/release/juno/sr2");
$ECLIPSE_VERSIONS[] = array("version" => 4.3, "name" => "Eclipse Kepler", "name_info" => "(current release)", "url" => "http://www.eclipse.org/downloads");
//$ECLIPSE_VERSIONS[] = array("version" => 4.4, "name" => "Eclipse Luna", "name_info" => "(developer build)", "url" => "http://www.eclipse.org/downloads/index-developer.php");


define("IMG_INCUBATION_EGG", "/images/egg-incubation.png");

/**
 urls
**/
define("URL_WIKI", "http://wiki.eclipse.org/Scout");
define("URL_LEARN_MORE", "http://wiki.eclipse.org/Scout/Overview");
define("URL_TUTORIAL", "http://wiki.eclipse.org/Scout/Tutorial");
define("URL_TUTORIAL_HELLOWORLD", "http://wiki.eclipse.org/Scout/Tutorial/HelloWorld");
define("URL_TUTORIAL_TOMCAT", "http://wiki.eclipse.org/Scout/Tutorial/Deploy_to_Tomcat");
define("URL_SCREENCASTS", "http://wiki.eclipse.org/Scout/Overview/Screencasts");
define("URL_SCREENCASTS_YOUTUBE", "http://www.youtube.com/eclipsescout");
define("URL_SCREENCAST_LAST", "http://www.youtube.com/watch?v=SgbKrZHseTQ&list=PLM9RhoqzsT4Xvkf1lo4ry57JdneEGUJaC");
define("URL_SLIDES", "http://wiki.eclipse.org/Scout/Overview/Slides");
define("URL_BLOG", "https://www.bsi-software.com/en/scout-blog/");
define("URL_TWITTER", "http://twitter.com/eclipseScout");
define("URL_SUMMARY", "http://projects.eclipse.org/projects/technology.scout");
define("URL_ECLIPSE_DOWNLOAD", "http://www.eclipse.org/downloads");
define("URL_ECLIPSE_INCUBATION", "http://www.eclipse.org/projects/what-is-incubation.php");
define("URL_ECLIPSE_INCUBATION_PHASE", "http://www.eclipse.org/projects/dev_process/incubation-phase.php");
define("URL_SCOUT_FORUM", "http://www.eclipse.org/forums/eclipse.scout");
define("URL_UPDATE_SITE_HELP", "http://help.eclipse.org/helios/index.jsp?topic=/org.eclipse.platform.doc.user/tasks/tasks-127.htm");
define("URL_INSTALL_MANUALLY_HELP", "http://wiki.eclipse.org/Scout/HowTo/Install_Scout_manually");
define("URL_JAVADOC", "#");
define("URL_BUGZILLA", "https://bugs.eclipse.org/bugs/buglist.cgi?product=scout");
define("URL_CONTRIBUTION_GUIDE","http://wiki.eclipse.org/Scout/Contribution");

define("URL_MAILING_LIST", "https://dev.eclipse.org/mailman/listinfo/scout-dev");
define("URL_OHLOH", "http://www.ohloh.net/p/eclipsescout");
define("URL_PLAN", "http://eclipse.org/projects/project-plan.php?projectid=technology.scout");

define("URL_BSI", "http://www.bsi-software.com/en/home.html");
define("URL_BSI_SCOUT", "http://www.bsi-software.com/en/technology/eclipse-scout.html");
/**
internal links
**/
define("SITE_DOWNLOAD", PATH_SCOUT_HOME."downloads/");
define("SITE_DOC", PATH_SCOUT_HOME."documentation/");
define("SITE_SUPPORT", PATH_SCOUT_HOME."support/");
define("SITE_GETINVOLVED", PATH_SCOUT_HOME."developers/");
