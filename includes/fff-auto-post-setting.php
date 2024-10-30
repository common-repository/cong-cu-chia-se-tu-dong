<?php

if ( !function_exists( 'add_action' ) ) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

class FFFAutoPOstSetting{

	protected $option ;
	protected $option_group = 'fff_auto_post_group';
	
	public function __construct() {
		add_action( ('admin_menu'), function() {
			add_menu_page( 
				'Chia sẻ tự động', 
				'Chia sẻ tự động', 
				'manage_options', 
				'fff_auto_post', 
				[$this,'create_page'],
				FFF_AUTO_POST_PLUGIN_URL.'assets/images/logo-chia-se-tu-dong-white.png',
				40
			);		
		});



		
	}

	public function create_page() {
		require(FFF_AUTO_POST_PLUGIN_DIR . 'views/index.php');
	}

}