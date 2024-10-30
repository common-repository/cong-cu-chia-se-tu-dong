jQuery(document).ready(function ($) {

    function callAPI(urlAPI,method,postVal,headers,callBack = undefined){
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

    var ACCESS_TOKEN = ''    
    var FFF_AUTO_POST_PLUGIN_URL = '' ;
    var FFF_AUTO_POST_PLUGIN_SETTING_PATH = '' ;
    var wpPostId = '';
    var shareAccount = 'all';
    var shareType = 'once';
    let postVal = {
        action:'get_token_fff_auto_post_action'
    }

    $.post(ajaxurl, postVal, function (res) {            
        ACCESS_TOKEN = res.token ;
        FFF_AUTO_POST_PLUGIN_URL  = res.FFF_AUTO_POST_PLUGIN_URL ;        
        FFF_AUTO_POST_PLUGIN_SETTING_PATH = res.FFF_AUTO_POST_PLUGIN_SETTING_PATH        
    },'JSON')    
    //popup calendar
    $('.fffAddSchedule').on('click', function () {        
        wpPostId = $(this).data('wppostid');        
        getListSocialAccount();
        //popup account
        Swal.fire({
            customClass: {
                container: '',
                popup: 'fff-modal-popup',
                header: 'fff-modal-header',
                title: 'fff-modal-title-container',
                closeButton: 'fff-modal-close-button',
                icon: '',
                image: '',
                content: 'fff-modal-content',
                input: '',
                actions: 'fff-modal-actions',
                confirmButton: 'fff-button saveScheduleBtn',
                denyButton: '',
                cancelButton: 'fff-button fff-is-gray',
                footer: 'fff-modal-subfooter schedule_popup',
            },
            width: 570,
            position: 'center-end',
            icon: '',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Tạo lịch',
            confirmButtonAriaLabel: '',
            cancelButtonText: 'Đóng',
            cancelButtonAriaLabel: '',
            footer: '',
            showClass: {
                popup: 'animate__animated animate__fadeInRight'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutRight'
            },
            title: `
            <div class="fff-modal-title">
                <div class="fff-modal-title-icon">
                    <i class="fas fa-plus"></i>
                </div>
                <div class="fff-modal-title-text">Xếp lịch mới cho bài</div>
            </div>
            `,
            html: `
            <div class="fff-modal-tabs">
                <div class="fff-modal-tab fff-is-active" data-step="1">
                <span>1</span>Thông tin</div>
                <div class="fff-modal-tab" data-step="2">
                <span>2</span>Tài khoản</div>
            
            </div>

            <!-- modal step-1 -->
            <div id="fffModalStep_1" class="fff-modal-step">
                <div class="fff-form-group">
                    <label>Tiêu đề<i class="far fa-question-circle fff-tooltip" data-title="Add a name for your schedule to recognize it in your schedule list"></i></label>
                    <input autocomplete="off" class="fff-form-input schedule_input_title" value="" placeholder="Nhập tiêu đề">
                </div>

                <div class="fff-form-group">
				<label>Thời gian bắt đầu<i class="far fa-question-circle fff-tooltip" data-title="When the schedule will start"></i></label>
                    <div class="fff-modal-row">
                        <div class="fff-modal-col">
                            <input type="text" autocomplete="off" class="fff-form-input schedule_input_start_date hasDatepicker" placeholder="Select date" data-language='en' id="">
                            <input type="time" autocomplete="off" class="fff-form-input schedule_input_start_time" placeholder="Select time" value="08:58">
                        </div>
                    </div>
                </div>
                
                <div id="fffScheduleHowShareRow" class="fff-form-group ">
                    <label>Hình thức chia sẻ<i class="far fa-question-circle fff-tooltip" data-title="Define to share a single post repeatedly or once"></i></label>
                    <select class="fff-form-select post_freq">
                        <option value="once" selected="">Chia sẻ một lần</option>
                        <option value="repeated">Chia sẻ nhiều lần</option>
                    </select>
                </div>

                <div id="fffSchedulePostEveryRow" class="fff-form-group fff-hide">
				<label>Post bài mỗi<i class="far fa-question-circle fff-tooltip" data-title="Thời gian giữa các bài post"></i></label>
                    <div class="fff-modal-row">
                        <div class="fff-modal-col">
                            <input type="number" class="fff-form-input interval" min="1" max="1000" step="1" value="1" style="width:100%!important;">
                            <select class="fff-form-select interval_type">
                            <option value="d">Ngày</option>
                                <option value="h">Giờ</option>
                                <option value="m">Phút</option>
                            </select>
                        </div>                        
                    </div>
                </div>

            </div> <!-- end modal step-1 -->

            
            <div id="fffModalStep_2" class="fff-modal-step fff-hide" style="display: block;">
                <div class="fff-metabox fff-is-mini">
                    <div class="fff-card-body">
                        <input type="hidden" name="share_checked" value="on">
                        <div id="fffMetaboxShareContainer">
                            <div class="fff-metabox-tabs">

                                <div data-tab="all" class="fff-metabox-tab fff-is-active schedule">all</div>
                                <!--<div data-tab="fb" class="fff-metabox-tab schedule"><i class="fab fa-facebook"></i></div> -->
                                <!--<div data-tab="instagram" class="fff-metabox-tab schedule"><i class="fab fa-instagram"></i></div> -->
                                <!--<div data-tab="vk" class="fff-metabox-tab schedule"><i class="fab fa-vk"></i></div> -->
                                <!--<div data-tab="pinterest" class="fff-metabox-tab schedule"><i class="fab fa-pinterest"></i></div> -->
                                <!--<div data-tab="ok" class="fff-metabox-tab schedule"><i class="fab fa-odnoklassniki"></i></div> -->
                                <!--<div data-tab="telegram" class="fff-metabox-tab schedule"><i class="fab fa-telegram"></i></div> -->
                                <div data-tab="medium" class="fff-metabox-tab schedule"><i class="fab fa-medium"></i></div>
                                <div data-tab="wordpress" class="fff-metabox-tab schedule"><i class="fab fa-wordpress"></i></div>
                                <!--<div data-tab="google_b" class="fff-metabox-tab schedule"><i class="fab fa-google"></i></div>-->
                                <div data-tab="blogger" class="fff-metabox-tab schedule"><i class="fab fa-blogger"></i></div>
                                <div data-tab="twitter" class="fff-metabox-tab schedule"><i class="fab fa-twitter"></i></div>
                                <div data-tab="linkedin" class="fff-metabox-tab schedule"><i class="fab fa-linkedin"></i></div>
                                <div data-tab="reddit" class="fff-metabox-tab schedule"><i class="fab fa-reddit"></i></div>
                                <div data-tab="tumblr" class="fff-metabox-tab schedule"><i class="fab fa-tumblr"></i></div>
                            </div>
                            <div class="fff-metabox-accounts">
                                <a class="fff-metabox-accounts-empty"><a href="${FFF_AUTO_POST_PLUGIN_SETTING_PATH}admin.php?page=fff_auto_post&action=fff-post-account">Thêm tài khoản</a></a>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div> 
            `,
            onOpen: () => {

                $('.fff-modal-tab').on('click', function () {
                    var step = $(this).data('step');
                    $('.fff-modal-tab').removeClass('fff-is-active');
                    $(this).addClass('fff-is-active');
                    switch (step) {
                        case 1:
                            $('#fffModalStep_1').removeClass('fff-hide');
                            $('#fffModalStep_2').addClass('fff-hide');
                            $('#fffModalStep_3').addClass('fff-hide');
                            $('#fffModalStep_4').addClass('fff-hide');
                            break;
                        case 2:
                            $('#fffModalStep_1').addClass('fff-hide');
                            $('#fffModalStep_2').removeClass('fff-hide');
                            $('#fffModalStep_3').addClass('fff-hide');
                            $('#fffModalStep_4').addClass('fff-hide');
                            break;
                        case 3:
                            $('#fffModalStep_1').addClass('fff-hide');
                            $('#fffModalStep_2').addClass('fff-hide');
                            $('#fffModalStep_3').removeClass('fff-hide');
                            $('#fffModalStep_4').addClass('fff-hide');
                            break;
                        case 4:
                            $('#fffModalStep_1').addClass('fff-hide');
                            $('#fffModalStep_2').addClass('fff-hide');
                            $('#fffModalStep_3').addClass('fff-hide');
                            $('#fffModalStep_4').removeClass('fff-hide');
                            break;
                        default:
                            break;
                    }
                })

                var dateNow = new Date();
                
                
                $('input.hasDatepicker').datepicker({
                    classes: 'fff-modal-datepicker',
                    dateFormat: 'dd/mm/yyyy'
                })
                $('.hasDatepicker').val(dateNow.getDate()+'/'+dateNow.getMonth()+'/'+dateNow.getFullYear());
                var time = `${dateNow.getHours() < 10 ? '0'+dateNow.getHours() :dateNow.getHours() }:${dateNow.getMinutes() < 10 ? '0'+dateNow.getMinutes():dateNow.getMinutes()}`
                $('.schedule_input_start_time').val(time);

                
                $('.saveScheduleBtn').on('click', function () {
                    saveSchedule();
                })

                $('.post_freq').on('change', function () {
                    let value = $(this).val();
                    shareType = value ;
                    if (value == 'repeated') $('#fffSchedulePostEveryRow').removeClass('fff-hide')
                    else $('#fffSchedulePostEveryRow').addClass('fff-hide')
                })

                $('.fff-metabox-tab').on('click',function(){
                    shareAccount = $(this).data('tab');
                })

            } //on open

        }) //swalfire

    })
    .on('hover',function(){
        $(this).html('<div class="fffAddSchedule-tooltip">Lịch Trình</div>')
    })
    .on('mouseleave', function(){
        $(this).html('')
    });

    function saveSchedule() {
        let title = $('.schedule_input_title').val();        
        let timeTemp = $('.schedule_input_start_date').val().split('/');
        var postVal = {
            action:'add_schedule_fff_auto_post_action',
            wpPostId :wpPostId,
            title: title,
            shareType: shareType,            
            timetopost:`${timeTemp[2]}-${timeTemp[1]}-${timeTemp[0]} ${$('.schedule_input_start_time').val()}:00`,
            shareAccount : shareAccount,
            interval:$('.interval').val(),
            interval_type:$('.interval_type').val()
        }
        
        Swal.fire({
            customClass: {
                container: 'fff-modal-loading-container',
                popup: 'fff-modal-loading',
            },
            html: '',
            showConfirmButton: false,
            showCancelButton: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
        })

        $.post(ajaxurl, postVal, function (res) {            
            shareComplete(res);
        },'JSON');
        
    }

    //share complete
    function shareComplete(obj) {
        Swal.close();
        let title = 'Lên lịch đăng bài thành công';
        let icon = 'success';
        if (obj.status == 'failed') {
            title = 'Bạn chưa có tài khoản social';
            icon = 'warning';
        }
        const Toast = Swal.mixin({
            customClass: {
                popup: 'fff-auto-post-notif',
            },
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: icon,
            title: title
        })
    }

    function getListSocialAccount() {
		
		var urlAPI = '//b.fffblue.com/huy/index.php?task=listSocialAccount' ;
		var header = {
			'Authorization':`Bearer ${ACCESS_TOKEN}`
		}
		callAPI(urlAPI,'get',{},header,renderAccountItem);
	}

	function renderAccountItem(obj){
        $('.fff-metabox-accounts').html(`<div class="fff-metabox-accounts-empty" ><i class="fas fa-plus" 
        style="border: 1px solid #e3eaf3;
        border-radius: 4px;
        padding: 5px;
        margin-right: 5px;"></i><a href="${FFF_AUTO_POST_PLUGIN_SETTING_PATH}admin.php?page=fff_auto_post&action=fff-post-account">Thêm tài khoản</a></div>`);
		if (obj) {
			for (const key in obj.data) {
				if (obj.data.hasOwnProperty(key)) {
					const element = obj.data[key];					
					var _icon = '';
                    var _name = '';
					switch (key) {
						case 'wordpress': 
							_icon = 'fab fa-wordpress';
							_name = 'Wordpress';
							element.forEach(ele => {
                                var info = { link:ele.info.primary_blog_url,display_name:ele.info.email } ;
								$('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info , _icon, _name));
							})	
							break;
						case 'facebook':
							_icon = 'fab fa-facebook';
							_name = 'Facebook';
							element.forEach(ele => {
                                var info = { link:ele.info.primary_blog_url,display_name:ele.info.email } ;
								$('.fff-metabox-accounts').append(buildHtmlShareAccount(key,info , _icon, _name));
							})	
							break;
						case 'twitter':
							_icon = 'fab fa-twitter';
							_name = 'Twitter';
							element.forEach(ele => {
                                var info = { link:`https://twitter.com/${ele.info.screen_name}`,display_name:`${ele.info.name}`};
								$('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info , _icon, _name));
							})	
							break;
						case 'instagram':
							_icon = 'fab fa-instagram';
							_name = 'Instagram';
							element.forEach(ele => {
								$('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info , _icon, _name));
							})	
							break;
						case 'linkedin':
							_icon = 'fab fa-linkedin';
							_name = 'Linkedin';
							element.forEach(ele => {
                                var info = { link:`https://www.linkedin.com/in/${ele.info.id}`,display_name:`${ele.info.localizedFirstName} ${ele.info.localizedLastName}` } ;
								$('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info , _icon, _name));
							})	
							break;
						case 'pinterest':
							_icon = 'fab fa-pinterest';
							_name = 'Pinterest';
							element.forEach(ele => {
								$('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info , _icon, _name));
							})	
							break;
						case 'reddit':
							_icon = 'fab fa-reddit';
							_name = 'Reddit';
							element.forEach(ele => {
                                var info = { link:`https://www.reddit.com${ele.info.subreddit.url}`,display_name:`${ele.accountId}`};
								$('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info , _icon, _name));
							})	
						break;
						case 'tumblr':
							_icon = 'fab fa-tumblr';
							_name = 'Tumblr';
							element.forEach(ele => {
                                var info = { link:`https://www.tumblr.com/blog/${ele.info.response.user.name}`,display_name:`${ele.info.response.user.name}`};
								$('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info , _icon, _name));
							})	
							break;
						case 'blogger':
							_icon = 'fab fa-blogger';
							_name = 'Blogger';
							element.forEach(ele => {
                                var info = { link:ele.info.url,display_name:ele.info.displayName } ;
								$('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info , _icon, _name));
							})	
							break;
						case 'medium':
							_icon = 'fab fa-medium';
							_name = 'Medium';
							element.forEach(ele => {
                                var info = { link:`https://medium.com/@${ele.info.data.username}`,display_name:ele.info.data.name } ;
								$('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info , _icon, _name));
							})	
							break;
						default:
							_icon = '';
							_name = '';
							break;
					}
				}
			}

		}//obj loop

		$('.fff-metabox-tab.schedule').on('click', function(){
			let tab_type = $(this).data('tab')
			$('.fff-metabox-tab.schedule').removeClass('fff-is-active');
			$(this).addClass('fff-is-active');
			$('.fff-add-schedule').attr('data-type', tab_type);

			switch (tab_type) {
				case 'all':
					$('.fff-metabox-account').slideDown('fast')
					break;
				default:
					$('.fff-metabox-account').slideUp('fast')
					$(`.fff-metabox-account[data-type='${tab_type}']`).slideDown('fast')
					break;
			}
		}) //account item navigation
	} //render account item

    function buildHtmlShareAccount(type, info, icon, name){
		let html = `<div class="fff-metabox-account" data-type="${type}" style="">
		<input type="hidden" name="">
		<div class="fff-metabox-account-image">
			<img src="${FFF_AUTO_POST_PLUGIN_URL}assets/images/userplaceholder.png">
		</div>
		<div class="fff-metabox-account-label">			
			<div class="fff-metabox-account-subtext">
				<i class="${icon}"></i>&nbsp;${name}
            </div>
            <a href="${info.link}" target="_blank" class="fff-metabox-account-text" style="margin-left:10px;">${info.display_name}</a>
		</div>
	</div>`;
		return html;
	}

});