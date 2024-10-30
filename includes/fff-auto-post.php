<?php

if ( !function_exists( 'add_action' ) ) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

class FFFAutoPost{

	private static $initiated = false;
	
	public function __construct() {
	}

	public static function init() {
		if ( ! self::$initiated ) {
			self::init_hooks();
		}
		self::activation_hook();

		self::checkLogin();
	}

	private static function init_hooks() {
		self::$initiated = true;

		add_action ( 'admin_enqueue_scripts', function () {
			if (is_admin ())
				wp_enqueue_media ();
		} );


		add_action( 'wp_head', array( 'FFFAutoPost', 'fff_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( 'FFFAutoPost', 'fff_admin_styles' ) );
		add_action( 'admin_enqueue_scripts', array( 'FFFAutoPost', 'fff_admin_scripts' ) );
		add_action( 'wp_ajax_share_post_fff_auto_post_action', array( 'FFFAutoPost', 'share_post_fff_auto_post_action' ) );
		add_action( 'wp_ajax_get_post_fff_auto_post_action', array( 'FFFAutoPost', 'get_post_fff_auto_post_action' ) );
		add_action( 'wp_ajax_add_post_fff_auto_post_action', array( 'FFFAutoPost', 'add_post_fff_auto_post_action' ) );
		add_action( 'wp_ajax_add_schedule_fff_auto_post_action', array( 'FFFAutoPost', 'add_schedule_fff_auto_post_action' ) );
		add_action( 'wp_ajax_get_posts_fff_auto_post_action', array( 'FFFAutoPost', 'get_posts_fff_auto_post_action' ) );
		add_action( 'wp_ajax_get_token_fff_auto_post_action', array( 'FFFAutoPost', 'get_token_fff_auto_post_action' ) );
		
		// Fire AJAX action for both logged in and non-logged in users
		add_action('wp_ajax_get_ajax_posts', 'get_ajax_posts');
		add_action('wp_ajax_nopriv_get_ajax_posts', 'get_ajax_posts');

		add_filter('script_loader_tag',array('FFFAutoPost','fff_add_type_to_script'),10,3);				

		add_filter('manage_post_posts_columns', function($columns) {			
			return array_merge($columns, ['fff_auto_Post' => 'FFF AP']);
		});		 		

		add_action('manage_post_posts_custom_column', function($column_key, $post_id) {
			if ($column_key == 'fff_auto_Post') {								
				echo '<i class="fas fa-rocket fffSharePostBtn" data-title="Share" data-wppostid="'.$post_id.'" data-toggle="tooltip" data-placement="bottom" ></i>
				<i class="fas fa-history fffAddSchedule fff-add-schedule" data-title="Schedule" data-wppostid="'.$post_id.'" data-toggle="tooltip" data-placement="bottom" ></i>';				
			}
		}, 10, 2);
	}

	public static function add_post_fff_auto_post_action() {

		global $wpdb; 
		$email = get_bloginfo('admin_email');
		$post_id = sanitize_text_field($_POST['postID']) ;				
		$custom_message = sanitize_text_field($_POST['message']) ;
		$platform_type =  sanitize_text_field($_POST['platform_type']);
		$check_customer = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'fff_auto_post WHERE email = "'.$email.'" LIMIT 1');

		$post = get_post($post_id); 
		$title = $post->post_title ;
		$excerpt = $post->post_excerpt ;
		$content = $post->post_content ;
		$tags = get_the_tags($post_id);
		$tag = [] ;
		if($tags)
		{
			foreach($tags as $t) {
				$tag[] = $t->name ;
			}
		}			

		$thumbnail = get_the_post_thumbnail_url( $post_id, 'full' );
		$original_url = get_permalink($post_id);		
		$post_type = 'wordpress';

		$urlApi = 'https://b.fffblue.com/huy/index.php?task=postCURD';
		$postVal = array( 
			'title' => $title,
			'excerpt' => $excerpt,
			'tags' => $tag,
			'thumbnail' => $thumbnail,
			'content' => $content,
			'original_url' => $original_url,
			'post_type' => $post_type,
			'post_information' => json_encode($post),
			'custom_message' => $custom_message,
			'platform_type' => $platform_type,
			'action' => 'create'
		);

		// var_dump($postVal);
		// die();
		$headers = array (
			'Authorization' =>'Bearer '.$check_customer[0]->access_token 
		) ;		

		$check_post = wp_remote_post($urlApi,array( 'body' => $postVal , 'headers' => $headers ));
		$post_body = wp_remote_retrieve_body($check_post);		
		$post_data = json_decode($post_body);			
		//
		$out = [];		
		$out['post'] = $post_data ;
		$out['postID'] = $post_id ;
		$out['status'] = 'success';

		echo json_encode($out);
		wp_die();
		
	}

	public static function add_schedule_fff_auto_post_action() {

		global $wpdb; 
		$email = get_bloginfo('admin_email');
		$post_id = sanitize_text_field($_POST['wpPostId']) ;				
		$title_schedule = sanitize_text_field($_POST['title']) ;
		$shareType = sanitize_text_field($_POST['shareType']) ;
		$timeToPost = sanitize_text_field($_POST['timetopost']) ;
		$interval = sanitize_text_field($_POST['interval']) ;
		$interval_type = sanitize_text_field($_POST['interval_type']) ;
		$shareAccount = sanitize_text_field($_POST['shareAccount']) ;		
		$check_customer = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'fff_auto_post WHERE email = "'.$email.'" LIMIT 1');

		$post = get_post($post_id); 
		$title = $post->post_title ;
		$excerpt = $post->post_excerpt ;
		$custom_message = $excerpt;
		$content = $post->post_content ;
		$tags = get_the_tags($post_id);
		$tag = [] ;
		if($tags)
		{
			foreach($tags as $t) {
				$tag[] = $t->name ;
			}
		}			

		$thumbnail = get_the_post_thumbnail_url( $post_id, 'full' );
		$original_url = get_permalink($post_id);		
		$post_type = 'wordpress';

		$urlApi = 'https://b.fffblue.com/huy/index.php?task=postCURD';
		$postVal = array( 
			'title' => $title,
			'excerpt' => $excerpt,
			'tags' => $tag,
			'thumbnail' => $thumbnail,
			'content' => $content,
			'original_url' => $original_url,
			'post_type' => $post_type,
			'post_information' => json_encode($post),
			'custom_message' => $custom_message,
			'action' => 'create'
		);

		
		$headers = array (
			'Authorization' =>'Bearer '.$check_customer[0]->access_token 
		) ;		

		$check_post = wp_remote_post($urlApi,array( 'body' => $postVal , 'headers' => $headers ));
		$post_body = wp_remote_retrieve_body($check_post);		
		$post_data = json_decode($post_body);					
		
		$urlApi = 'https://b.fffblue.com/huy/index.php?task=addSchedule';
		$postVal = array( 
			'postId' => $post_data->data,
			'title' => $title_schedule,
			'timeToPost' => $timeToPost,
			'shareAccount' => $shareAccount,
			'shareType' => $shareType,
			'interval' => $interval,
			'interval_type' => $interval_type

		);
		
		$check_schedule = wp_remote_post($urlApi,array( 'body' => $postVal , 'headers' => $headers ));
		$schedule_body = wp_remote_retrieve_body($check_schedule);		
		$schedule_data = json_decode($schedule_body);			
		
		//
		$out = [];		
		$out['schedule'] = $schedule_data ;		
		$out['status'] = 'success';

		echo json_encode($out);
		wp_die();
		
	}

	public static function get_token_fff_auto_post_action() {

		global $wpdb; 
		$email = get_bloginfo('admin_email');		
		$check_customer = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'fff_auto_post WHERE email = "'.$email.'" LIMIT 1');

		
		$out = [];				
		$out['token'] = $check_customer[0]->access_token  ;
		$out['FFF_AUTO_POST_PLUGIN_URL'] = FFF_AUTO_POST_PLUGIN_URL ;
		$out['FFF_AUTO_POST_PLUGIN_SETTING_PATH'] = admin_url() ;
		$out['status'] = 'success';

		echo json_encode($out);
		wp_die();
		
	}

	public static function get_post_fff_auto_post_action(){
		global $wpdb; 		
		$post_id = sanitize_text_field($_POST['postID']) ;
		$post = get_post($post_id); 
		$title = $post->post_title ;
		$excerpt = $post->post_excerpt ;
		$content = $post->post_content ;
		$thumbnail = get_the_post_thumbnail_url( $post_id, 'full' );
		$original_url = get_permalink($post_id);		
		$post_type = 'wordpress';
		$tags = get_the_tags($post_id);
		$tag = [] ;
		if($tags)
		{
			foreach($tags as $t) {
				$tag[] = $t->name ;
			}
		}		
		$post->post_content = '';
		$postVal = array( 
			'title' => $title,
			'excerpt' => $excerpt,
			'tags' => $tag,
			'thumbnail' => $thumbnail,
			'content' => $content,
			'share_link' => $original_url,
			'type' => 'all'			
		);
		
		$out = [];		
		$out['data'] = $postVal;		
		$out['status'] = 'success';

		echo json_encode($out);
		wp_die();
	}

	public static function share_post_fff_auto_post_action() {

		global $wpdb; 
		$email = get_bloginfo('admin_email');
		$post_id = sanitize_text_field($_POST['postID']) ;
		
		$check_customer = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'fff_auto_post WHERE email = "'.$email.'" LIMIT 1');

		$post = get_post($post_id); 
		$title = $post->post_title ;
		$excerpt = $post->post_excerpt ;
		$content = $post->post_content ;
		$platform_type = sanitize_text_field($_POST['platform_type']);
		$tags = get_the_tags($post_id);
		$tag = [] ;
		if($tags)
		{
			foreach($tags as $t) {
				$tag[] = $t->name ;
			}
		}			

		$thumbnail = get_the_post_thumbnail_url( $post_id, 'full' );
		$original_url = get_permalink($post_id);		
		$post_type = 'wordpress';

		$urlApi = 'https://b.fffblue.com/huy/index.php?task=sharePost';
		$postVal = array( 
			'title' => $title,
			'excerpt' => $excerpt,
			'tags' => $tag,
			'thumbnail' => $thumbnail,
			'content' => $content,
			'original_url' => $original_url,
			'post_type' => $post_type,
			'post_information' => $post
		);

		$headers = array (
			'Authorization' =>'Bearer '.$check_customer[0]->access_token 
		) ;		

		// $check_post = wp_remote_post($urlApi,array( 'body' => $postVal , 'headers' => $headers ));
		// $post_body = wp_remote_retrieve_body($check_post);				
		// $post_data = json_decode($post_body);			
		//

		$out = [];		
		// $out['post'] = $post_data ;
		$out['postID'] = $post_id ;
		$out['status'] = 'success';

		echo json_encode($out);
		wp_die();
		
	}

	public static function get_posts_fff_auto_post_action() {

		global $wpdb; 
		
		$posts = get_posts();
		$data = [] ;
		foreach($posts as $post){
			$temp['title'] = $post->post_title ;
			$temp['url'] = get_permalink( $post->ID) ;
			$temp['id'] = $post->ID ;
			$temp['excerpt'] = $post->post_excerpt ;
			$temp['platform_type'] = $post->post_platform_type;
			$temp['content'] = $post->post_content ;
			$temp['feature_image'] = get_the_post_thumbnail_url($post->ID) ;
			$data[]=$temp ;
		}	
		//

		$out = [];		
		$out['data'] = $data ;		
		$out['status'] = 'success';

		echo json_encode($out);
		wp_die();		
	}

	private static function checkLogin(){
		global $wpdb;
		$email = get_bloginfo('admin_email') ;		
		$check_customer = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'fff_auto_post WHERE email = "'.$email.'" LIMIT 1');
		if(empty($check_customer))
		{
			$urlApi = 'https://b.fffblue.com/huy/index.php?task=wpLoginByEmail';
			$postVal = array( 'email' => $email );
			
			$check_user = wp_remote_post($urlApi,array( 'body' => $postVal ));
			$customer_body = wp_remote_retrieve_body($check_user);
			$customer = json_decode($customer_body );			
			$insert = array(
				"email" => $email,
				"access_token" => $customer->data->access_token
			);
			$wpdb->insert($wpdb->prefix.'fff_auto_post',$insert);
		}		
	}

	public static function fff_scripts(){
		echo '<script type="text/javascript">
				var ajaxurl = "' . admin_url('admin-ajax.php') . '";
			  </script>';
		wp_enqueue_script( 'fff-auto-post-script', FFF_AUTO_POST_PLUGIN_URL.'assets/js/widgetloader.js', array('jquery'), true,false );
	}
	
	public static function fff_admin_styles($hook) {

		wp_enqueue_style('fff-admin-menu-auto-post', FFF_AUTO_POST_PLUGIN_URL . 'assets/css/admin-menu.css',[],true,false);
		wp_enqueue_style('fff-auto-sweetalert2', FFF_AUTO_POST_PLUGIN_URL . 'dist/css/sweetalert2.min.css');
		wp_enqueue_style('fff-admin-theme-auto-post', FFF_AUTO_POST_PLUGIN_URL . 'assets/css/auto-post-index.css',[],true,false);	
		wp_enqueue_style('fff-auto-animate', FFF_AUTO_POST_PLUGIN_URL . 'dist/css/animate.min.css');
		wp_enqueue_style('fff-auto-post-fontawesome', FFF_AUTO_POST_PLUGIN_URL . 'dist/css/all.min.css');
		wp_enqueue_style('fff-auto-datepicker', FFF_AUTO_POST_PLUGIN_URL . 'dist/css/datepicker.min.css');

		if($hook != 'toplevel_page_fff_auto_post')
		  return ;

		wp_enqueue_style('fff-admin-theme-auto-post-body', FFF_AUTO_POST_PLUGIN_URL . 'assets/css/auto-post-admin.css');
		wp_enqueue_style('fff-auto-post-bootstrap', FFF_AUTO_POST_PLUGIN_URL . 'dist/css/bootstrap.min.css');		
		wp_enqueue_style('fff-auto-post-select2', FFF_AUTO_POST_PLUGIN_URL . 'dist/css/select2.min.css');
		wp_enqueue_style('fff-auto-post-chart', FFF_AUTO_POST_PLUGIN_URL . 'dist/css/Chart.css');		
		
	}

	public static function fff_admin_scripts($hook) {

		wp_enqueue_script( 'fff-auto-post-admin', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fffAdminPoster.js', array('jquery'), true,true );
		wp_enqueue_script( 'fff-auto-post-admin-add-schedule', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fff-auto-post-admin-add-schedule.js', array('jquery'), true,true );
		wp_enqueue_script( 'fff-auto-post-sweetalert2-js', FFF_AUTO_POST_PLUGIN_URL.'dist/js/sweetalert2.all.min.js', array('jquery'), true,true );
		wp_enqueue_script( 'fff-auto-post-datepicker-js', FFF_AUTO_POST_PLUGIN_URL.'dist/js/datepicker.min.js', array('jquery'), true,true );
		wp_enqueue_script( 'fff-auto-post-datepickeren-js', FFF_AUTO_POST_PLUGIN_URL.'dist/js/datepicker.en.min.js', array('jquery'), true,true );
		

		if($hook != 'toplevel_page_fff_auto_post')
		  return ;

		//   wp_enqueue_script( 'fff-auto-post-add-schedule', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fff-auto-post-add-schedule.js', array('jquery'), true,true );
		wp_enqueue_script( 'fff-auto-post-select2-js', FFF_AUTO_POST_PLUGIN_URL.'dist/js/select2.min.js', array('jquery'), true,true );
		wp_enqueue_script( 'fff-auto-post-chart-js', FFF_AUTO_POST_PLUGIN_URL.'dist/js/Chart.js', array('jquery'), true,true );		
		
	}

	public static function fff_add_type_to_script($tag,$handle, $src){
		$arr =  [''];
		if ( 'fff-auto-post-script' === $handle )
			return '<script async="async" src="' . esc_url( $src ) . '"></script>';
		if ( !in_array($handle,$arr)) 
			return $tag;
		$tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
		return $tag;
	}

	static public function activation_hook () {
		global $wpdb;
		$charsetCollate = $wpdb->get_charset_collate();

		// create widget table		
        $widgetTable = $wpdb->prefix . 'fff_auto_post';
        $createWidgetTable = "CREATE TABLE IF NOT EXISTS `{$widgetTable}` (
            `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
			`email` varchar(255) NOT NULL,
            `user_token` varchar(255) NOT NULL,
            `access_token` varchar(255) NOT NULL,
            `domain` varchar(255) NOT NULL,
            `tracking_code` varchar(255) NOT NULL,
			`is_vip` TINYINT DEFAULT 0,
			`vip_expired` timestamp NOT NULL,
            `date` timestamp NOT NULL,
            PRIMARY KEY (`id`)
		) {$charsetCollate};";

		//createTrackingTable
        $trackingTable = $wpdb->prefix . 'fff_auto_post_tracking';
        $createTrackingTable = "CREATE TABLE IF NOT EXISTS `{$trackingTable}` (
            `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
			`click` INT(6) DEFAULT 0,
            `view` INT (6) DEFAULT 0,
            `widget_data` text,
			`widget_status` varchar(50) DEFAULT 'publish',
			`widget_type` varchar(100) ,
            `widget_id` varchar(255) NOT NULL,
            `date` timestamp NOT NULL,
            PRIMARY KEY (`id`)
		) {$charsetCollate};";

		//createCustomerInformationTracking
        $customerTable = $wpdb->prefix . 'fff_auto_post_customer_tracking';
        $createCustomerTable = "CREATE TABLE IF NOT EXISTS `{$customerTable}` (
            `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
			`customer_fullname` varchar(255) ,
			`customer_phone` varchar(255) ,
			`customer_email` varchar(255) ,
			`customer_note` text ,
			`widget_type` varchar(255) ,
            `date` timestamp NOT NULL,
            PRIMARY KEY (`id`)
		) {$charsetCollate};";

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		$db = dbDelta( $createWidgetTable );
		$db = dbDelta( $createTrackingTable );
		$db = dbDelta( $createCustomerTable );
		// var_dump('active fff auto post hook.');
	}

	static public function deactivation_hook() {
		global $wpdb;
		$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}fff_auto_post" );
		$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}fff_auto_post_tracking" );
		$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}fff_auto_post_customer_tracking" );
	}


}