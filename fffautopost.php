<?php
/**
 * Plugin Name: Công cụ chia sẻ tự động
 * Description: Công cụ chia sẻ tự động - tăng tương tác bài viết - tăng traffic cho website
 * Plugin URI: https://fff.com.vn
 * Author: fff.com.vn
 * Version: 1.0.1
 * Author URI: https://fff.com.vn
 */

if ( !function_exists( 'add_action' ) ) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

define( 'FFF_AUTO_POST_VERSION', '1.0.1' );
define( 'FFF_AUTO_POST_MINIMUM_WP_VERSION', '4.1.1' );
define( 'FFF_AUTO_POST_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'FFF_AUTO_POST_PLUGIN_URL', plugin_dir_url( (__FILE__) ) );

register_activation_hook( __FILE__, array( 'FFFAutoPost', 'activation_hook' ) );
register_deactivation_hook( __FILE__, array( 'FFFAutoPost', 'deactivation_hook' ) );

require_once( FFF_AUTO_POST_PLUGIN_DIR.'includes/fff-auto-post-setting.php');
require_once( FFF_AUTO_POST_PLUGIN_DIR.'includes/fff-auto-post.php');

$fff_auto_post_setting = new FFFAutoPostSetting();

add_action( 'init', array( 'FFFAutoPost', 'init' ) );
