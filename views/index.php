<?php

  global $wpdb ;

  $current_page = !empty(@$_GET['page']) ?  sanitize_text_field($_GET['page']) : 'fff_auto_post' ;
  define( 'FFF_AUTO_POST_PLUGIN_SETTING_PATH', './admin.php?page='.$current_page );

  
  $user =  $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'fff_auto_post LIMIT 1');
  if(!empty($user))    
    $access_token = $user[0]->access_token ;
  
  $version = rand(10,100);  

  $view = !empty(@$_REQUEST['view']) ?  sanitize_text_field($_REQUEST['view']) : '' ;
  $action =  !empty(@$_REQUEST['action']) ?  sanitize_text_field($_REQUEST['action']) : '' ;
  
  if(empty($action)) $action = 'fff-post-account' ;

  require_once( FFF_AUTO_POST_PLUGIN_DIR .'views/header.php');
  
  
?>
  <body>
  <script>
          var FFF_AUTO_POST_PLUGIN_URL = '<?php echo FFF_AUTO_POST_PLUGIN_URL;?>';
          var WEBSITE = '<?php echo get_site_url('');?>' ;
          var ADMIN_WEBSITE = '<?php echo admin_url();?>' ;
          var ACCESS_TOKEN = '<?php echo $access_token;?>' ;
          function callAPI(urlAPI,method,postVal,headers,callBack=undefined){
              jQuery.ajax({
                  url: urlAPI,
                  type: method,
                  data: postVal,
                  headers: headers,
                  dataType: 'json',
                  success: function (data) {                    
                    if(callBack != undefined)
                      callBack(data);
                  }
              });    
          }
  </script>
    <div id="main-wrapper">
<?php
  require_once(FFF_AUTO_POST_PLUGIN_DIR . "views/".$action.".php");
  require_once(FFF_AUTO_POST_PLUGIN_DIR . "views/footer.php");
?>
