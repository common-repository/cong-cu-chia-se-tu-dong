var POSTID = '';
var WPPOSTID = '';

jQuery(document).ready(function ($) {

    var shareAccount = 'all';
    var shareType = 'once';

    getListScheduleAccount();

    function getListScheduleAccount() {
        var urlAPI = '//b.fffblue.com/huy/index.php?task=getSchedule&page=1';
        var header = {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
        callAPI(urlAPI, 'get', {}, header, renderScheduleItems);

        // get post current site		
		let postVal = {
			action: 'get_posts_fff_auto_post_action'
		}
		$.post(ajaxurl, postVal, function (res) {
            // console.log('res schedule post', res)
			let data = res.data;
			let html = '';
			data.forEach(ele => {
				let temp = `<option value="${ele.url}" data-postid="${ele.id}">${ele.title}</option>`;
				html += temp;
			});
			$('#listPost').html(html);
			$("#fffShareLink").on('change', function () {
				var option = $('datalist').find('option[value="' + this.value + '"]');
				console.log($(option).data('postid'));
				postID = $(option).data('postid');
				WPPOSTID = postID;
				data.forEach(ele => {
					if (postID == ele.id) {
						// let content = ele.excerpt != '' ? ele.excerpt : ele.content;
						$('#fffShareTitle').val(ele.title);
                        $('#fffShareContent').val(ele.content)
                        $('#fffShareExcerpt').val(ele.excerpt)
						$('#imgUploadResult').attr('src', ele.feature_image)
						$('.fff-form-image-preview').removeClass('fff-hide');
						$(`label[for='imgUpload']`).addClass('fff-hide');
						$('#closeImg').on('click', function () {
							$('.fff-form-image-preview').addClass('fff-hide');
							$(`label[for='imgUpload']`).removeClass('fff-hide');
						})
					}
				})
			});
		}, 'JSON')
    }

    function renderScheduleItems(obj) {
        console.log('obj ', obj.data.schedules)
        let html = '';
        if (obj.status == 'success') {
            $('.fff-title-count').html(obj.data.schedules.length);            
            obj.data.schedules.forEach(ele => {
                console.log(ele.title);                
                let title = ele.title == null ? `Bài xếp lịch ID ${ele.scheduleId}` : ele.title;
                let interval = ele.interval == null ? '-' : ele.interval;
                let intervalType = ele.intervalType == null ? '-' : ele.intervalType == 'h' ? 'giờ' : ele.intervalType == 'm' ? 'phút' : '-';
                let startDate = ele.startDate == null ? '-' : ele.startDate;
                let nextTime = ele.nextTime == null ? '-' : ele.nextTime;
                let statusIcon = ele.status == 'pending' ? 'fa fa-play' : 'fa fa-pause';
                let statusClass = ele.status == 'pending' ? 'fff-is-warning' : '';
                let status = ele.status == 'pending' ? 'working' : 'pending';

                html += `<div data-id="${ele.scheduleId}" class="fff-schedule">
                        <div class="fff-schedule-checkbox-container">
                            <input data-id="${ele.scheduleId}" type="checkbox" class="fff-form-checkbox fff-schedule-checkbox">
                        </div>
                        <div class="fff-schedule-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <div class="fff-schedule-title">
                            <div class="fff-schedule-title-text">
                            ${title} </div>
                            <div class="fff-schedule-title-subtext">
                                Loại bài: <u>Post</u> </div>
                        </div>
                        <div class="fff-schedule-dates">
                            <div class="fff-schedule-dates-row">
                                <div class="fff-schedule-dates-label">
                                    Ngày bắt đầu </div>
                                <div class="fff-schedule-dates-date">
                                    <i class="fas fa-calendar-alt"></i> ${startDate} </div>
                            </div>
                            <div class="fff-schedule-dates-row">
                                <div class="fff-schedule-dates-label">
                                    Bài tiếp theo </div>
                                <div class="fff-schedule-dates-date">
                                    <i class="fas fa-calendar-alt"></i> ${nextTime} </div>
                            </div>
                        </div>
                        <div class="fff-schedule-interval">
                            <i class="fas fa-sync-alt"></i> ${interval} ${intervalType} </div>
                        <div class="fff-schedule-status-container">
                            <span class="fff-status ${statusClass}">
                            ${status} </span>
                            <button type="button" class="fff-button fff-is-info fff-tooltip fff-change-schedule"
                                data-id="${ele.scheduleId}" data-status="${status}">
                                <i class="${statusIcon}"></i></button>
                        </div>
                        <div class="fff-schedule-controls">
                            <!--<div class="fff-schedule-control" data-title="Logs" data-load-modal="posts_list"
                                data-parameter-schedule_id="1" data-fullscreen="true">
                                <i class="fas fa-list-alt"></i>
                                <span class="fff-schedule-control-text">20</span>
                            </div>
                            <div class="fff-schedule-control" data-load-modal="edit_schedule"
                                data-parameter-schedule_id="1">
                                <i class="fas fa-pencil-alt"></i>
                            </div>-->
                            <div data-id="${ele.scheduleId}" class="fff-schedule-control fff-delete-schedule">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    </div>`
            });
            
        }
        //
        $('.fff-schedules').html(html);

        $('.fff-delete-schedule').on('click', function () {
            let scheduleId = $(this).data('id');
            var urlAPI = '//b.fffblue.com/huy/index.php?task=deleteSchedule';
            var header = {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
            let postVal = {
                scheduleId: scheduleId
            }
            callAPI(urlAPI, 'post', postVal, header, deleteComplete);
        })

        $('.fff-change-schedule').on('click', function(){
            let scheduleStatus = $(this).data('status');
            let scheduleId = $(this).data('id');
            var urlAPI = '//b.fffblue.com/huy/index.php?task=updateStatusSchedule';
            var header = {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
            let postVal = {
                scheduleId: scheduleId,
                status: scheduleStatus
            }
            callAPI(urlAPI, 'post', postVal, header, changeStatusComplete);
        })

        $('.fff-change-schedule').on('mouseenter', function(){
            $(this).find('i').html('<div class="fffSharePostBtn-tooltip">Đổi trạng thái</div>')        
        }).on('mouseleave', function(){
            $(this).find('i').html('')
        });

        $('.fff-delete-schedule').on('mouseenter', function(){
            $(this).find('i').html('<div class="fffSharePostBtn-tooltip">Xóa</div>')        
        }).on('mouseleave', function(){
            $(this).find('i').html('')
        });

        function deleteComplete(obj) {
            getListScheduleAccount();
            Swal.close();
            let title = 'Xóa bài thành công';
            let icon = 'success';
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

        function changeStatusComplete(obj) {
            getListScheduleAccount();
            Swal.close();
            let title = 'Thay đổi status thành công';
            let icon = 'success';
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
    } // render schedule

    //add schedule popup
    $('.fff-add-schedule').on('click', function () {
        getListSocialAccount();
        getListScheduleAccount();
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
                <span>2</span>Bài đăng</div>
                <div class="fff-modal-tab" data-step="3">
                <span>3</span>Tài khoản</div>
            
            </div>

            <!-- modal step-1 -->
            <div id="fffModalStep_1" class="fff-modal-step">
                <div class="fff-form-group">
                    <label>Tên<i class="far fa-question-circle fff-tooltip" data-title="Add a name for your schedule to recognize it in your schedule list"></i></label>
                    <input autocomplete="off" class="fff-form-input schedule_input_title" value="" placeholder="Điền tên">
                </div>

                <div class="fff-form-group">
				<label>Thời gian bắt đầu<i class="far fa-question-circle fff-tooltip" data-title="When the schedule will start"></i></label>
                    <div class="fff-modal-row">
                        <div class="fff-modal-col">
                            <input type="text" autocomplete="off" class="fff-form-input schedule_input_start_date hasDatepicker" placeholder="Chọn ngày" data-language='en' id="">
                            <input type="time" autocomplete="off" class="fff-form-input schedule_input_start_time" placeholder="Select time" value="">
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
                            <input type="number" class="fff-form-input interval" min="1" max="1000" step="1" value="1">
                            <select class="fff-form-select interval_type">
                                <option value="h">Giờ</option>
                                <option value="m">Phút</option>
                            </select>
                        </div>
                        <div class="fff-modal-col"></div>
                    </div>
                </div>

            </div> <!-- end modal step-1 -->

            <!-- modal step-2 -->
            <div id="fffModalStep_2" class="fff-modal-step fff-hide" style="display: block;">
            <div class="fff-metabox fff-is-mini">
                <div class="fff-card-body">

                <div class="fff-form-group">
                <label for="imgUpload">
                    <div id="wpMediaBtn" class="fff-form-image">
                        <i class="fas fa-camera-retro"></i>
                    </div>
                </label>
                <input type='file' id="imgUpload" class="fff-hide" />
                <div id="imageShow" class="fff-form-image-preview fff-hide" data-id="">
                    <img id="imgUploadResult" src="#"> <i class="fas fa-times" id="closeImg"></i>
                </div>
            </div>

            <div id="fffShareURL" class="fff-form-group ">
                <label>Link</label>
                <input id="fffShareLink" list="listPost" type="text" class="fff-form-input"
                    placeholder="Link bài viết" value="">
                    <datalist id="listPost">
                        <option value="first_value" data-id="1">Some Description</option>                                        
                    </datalist>
            </div>
            <div  class="fff-form-group ">
                <label>Tiêu đề</label>
                <input id="fffShareTitle" autocomplete="off" type="text" class="fff-form-input"
                    placeholder="Tiêu đề" value="">
            </div>
            <div class="fff-form-group">
                <label class="fff-is-jb">
                    Miêu tả ngắn
                    <!-- <span>Characters count: <span id="fffShareCharCount">0</span></span> -->
                </label>
                <textarea id="fffShareExcerpt" class="fff-form-input message_box" placeholder="Nội dung"
                    maxlength="500"></textarea>
            </div>
            <div class="fff-form-group">
                <label class="fff-is-jb">
                    Nội dung chia sẻ
                    <!-- <span>Characters count: <span id="fffShareCharCount">0</span></span> -->
                </label>
                <textarea id="fffShareContent" class="fff-form-input message_box" placeholder="Nội dung"
                    maxlength="500"></textarea>
            </div>

                </div>
            </div>
            </div>
            <!-- end modal step-2 -->

            <!-- modal step-3 -->
            <div id="fffModalStep_3" class="fff-modal-step fff-hide" style="display: block;">
                <div class="fff-metabox fff-is-mini">
                    <div class="fff-card-body">
                        <input type="hidden" name="share_checked" value="on">
                        <div id="fffMetaboxShareContainer">
                            <div class="fff-metabox-tabs">
                            <div data-tab="all" class="fff-metabox-tab fffMetaBoxTab schedule fff-is-active ">all</div>
                            <!-- <div data-tab="facebook" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-facebook"></i></div> -->
                            <div data-tab="twitter" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-twitter"></i></div>
                            <!-- <div data-tab="instagram" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-instagram"></i></div> -->
                            <div data-tab="linkedin" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-linkedin"></i></div>
                            <!-- <div data-tab="vk" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-vk"></i></div> -->
                            <!-- <div data-tab="pinterest" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-pinterest"></i></div> -->
                            <div data-tab="reddit" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-reddit"></i></div>
                            <div data-tab="tumblr" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-tumblr"></i></div>
                            <!-- <div data-tab="ok" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-odnoklassniki"></i></div> -->
                            <div data-tab="blogger" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-blogger"></i></div>
                            <!-- <div data-tab="telegram" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-telegram"></i></div> -->
                            <div data-tab="medium" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-medium"></i></div>
                            <div data-tab="wordpress" class="fff-metabox-tab fffMetaBoxTab schedule"><i class="fab fa-wordpress"></i></div>
                            </div>
                            <div class="fff-metabox-accounts fffMetaBoxAccounts">
                                <div class="fff-metabox-accounts-empty fffMetaBoxAccountsEmpty">
                                    Thêm tài khoản của bạn	</div>
                            </div>  
                        </div>
                    </div>
                    <!--<div class="fff-card-footer fff-is-right">
                        <button type="button" class="fff-button fff-is-gray fff-metabox-add">ADD</button>
                        <button type="button" class="fff-button fff-is-red fff-metabox-clear">CLEAR</button>
                    </div>-->
                </div>
            </div> <!-- end modal step-3 -->

           
            `,
            onOpen: () => {

                if (typeof wp !== 'undefined' && wp.media && wp.media.editor) {
                    $('#wpMediaBtn').on('click', function (e) {
                        e.preventDefault();
                        wp.media.editor.send.attachment = function (props, attachment) {
                            attachmentURL = wp.media.attachment(attachment.id).get("url");
            
                            $('#imgUploadResult').attr('src', attachmentURL);
                            $('.fff-form-image-preview').removeClass('fff-hide');
                            $(`label[for='imgUpload']`).addClass('fff-hide');
                            $('#closeImg').on('click', function () {
                                $('.fff-form-image-preview').addClass('fff-hide');
                                $(`label[for='imgUpload']`).removeClass('fff-hide');
                                attachmentURL = '';
                            })
            
                        };
                        wp.media.editor.open();
                        return false;
                    });
                }

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
                $('.hasDatepicker').val(dateNow.getDate() + '/' + dateNow.getMonth() + '/' + dateNow.getFullYear());
                var time = `${dateNow.getHours()}:${dateNow.getMinutes() < 10 ? '0'+dateNow.getMinutes():dateNow.getMinutes()}`
                $('.schedule_input_start_time').val(time);

                $('.saveScheduleBtn').on('click', function () {
                    saveSchedule();
                })

                //post interval
                $('.post_freq').on('change', function () {
                    let value = $(this).val();
                    shareType = value;
                    if (value == 'repeated') $('#fffSchedulePostEveryRow').removeClass('fff-hide')
                    else $('#fffSchedulePostEveryRow').addClass('fff-hide')
                })

                $('.fffMetaBoxTab').on('click', function () {
                    shareAccount = $(this).data('tab');
                })

            } //on open

        }) //swalfire
    });

    function getListSocialAccount() {

        var urlAPI = '//b.fffblue.com/huy/index.php?task=listSocialAccount';
        var header = {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
        callAPI(urlAPI, 'get', {}, header, renderAccountItem);
    }

    function renderAccountItem(obj) {
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
                                var info = {
                                    link: ele.info.primary_blog_url,
                                    display_name: ele.info.email
                                };
                                $('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info, _icon, _name));
                            })
                            break;
                        case 'facebook':
                            _icon = 'fab fa-facebook';
                            _name = 'Facebook';
                            element.forEach(ele => {
                                var info = {
                                    link: ele.info.primary_blog_url,
                                    display_name: ele.info.email
                                };
                                $('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info, _icon, _name));
                            })
                            break;
                        case 'twitter':
                            _icon = 'fab fa-twitter';
                            _name = 'Twitter';
                            element.forEach(ele => {
                                var info = {
                                    link: `https://twitter.com/${ele.info.screen_name}`,
                                    display_name: `${ele.info.name}`
                                };
                                $('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info, _icon, _name));
                            })
                            break;
                        case 'instagram':
                            _icon = 'fab fa-instagram';
                            _name = 'Instagram';
                            element.forEach(ele => {
                                $('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info, _icon, _name));
                            })
                            break;
                        case 'linkedin':
                            _icon = 'fab fa-linkedin';
                            _name = 'Linkedin';
                            element.forEach(ele => {
                                var info = {
                                    link: `https://www.linkedin.com/in/${ele.info.id}`,
                                    display_name: `${ele.info.localizedFirstName} ${ele.info.localizedLastName}`
                                };
                                $('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info, _icon, _name));
                            })
                            break;
                        case 'pinterest':
                            _icon = 'fab fa-pinterest';
                            _name = 'Pinterest';
                            element.forEach(ele => {
                                $('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info, _icon, _name));
                            })
                            break;
                        case 'reddit':
                            _icon = 'fab fa-reddit';
                            _name = 'Reddit';
                            element.forEach(ele => {
                                var info = {
                                    link: `https://www.reddit.com${ele.info.subreddit.url}`,
                                    display_name: `${ele.accountId}`
                                };
                                $('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info, _icon, _name));
                            })
                            break;
                        case 'tumblr':
                            _icon = 'fab fa-tumblr';
                            _name = 'Tumblr';
                            element.forEach(ele => {
                                var info = {
                                    link: `https://www.tumblr.com/blog/${ele.info.response.user.name}`,
                                    display_name: `${ele.info.response.user.name}`
                                };
                                $('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info, _icon, _name));
                            })
                            break;
                        case 'blogger':
                            _icon = 'fab fa-blogger';
                            _name = 'Blogger';
                            element.forEach(ele => {
                                var info = {
                                    link: ele.info.selfLink,
                                    display_name: ele.info.displayName
                                };
                                $('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info, _icon, _name));
                            })
                            break;
                        case 'medium':
                            _icon = 'fab fa-medium';
                            _name = 'Medium';
                            element.forEach(ele => {
                                var info = {
                                    link: `https://medium.com/@${ele.info.data.username}`,
                                    display_name: ele.info.data.name
                                };
                                $('.fff-metabox-accounts').append(buildHtmlShareAccount(key, info, _icon, _name));
                            })
                            break;
                        default:
                            _icon = '';
                            _name = '';
                            break;
                    }

                }
            }

        }

        $('.fff-metabox-tab').on('click', function () {
            let tab_type = $(this).data('tab')
            $('.fff-metabox-tab').removeClass('fff-is-active');
            $(this).addClass('fff-is-active');
            $('.shareNowBtn').attr('data-type', tab_type);
            $('.fff-metabox-accounts-empty').attr('data-type', tab_type);
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

        $('.fff-metabox-accounts-empty').on('click', function () {
            popupAddAccount();
        })

    } //render account item

    function buildHtmlShareAccount(type, info, icon, name) {
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

    function saveSchedule() {
        
        // console.log('check postid', POSTID);
        let title = $('.schedule_input_title').val();
        let interval = $('.interval').val();
        let interval_type = $('.interval_type').val();
        let timeTemp = $('.schedule_input_start_date').val().split('/');
        let time = $('.schedule_input_start_time').val();
        shareType = $('.post_freq').val();

        if (!POSTID) {
            let postVal = {
                action: 'add_post_fff_auto_post_action',
                postID: WPPOSTID,
                message: $('#fffShareContent').val()
            }
            $.post(ajaxurl, postVal, function (res) {
                let apiUrl = '//b.fffblue.com/huy/index.php?task=addSchedule'
                let postval = {
                    postId: res.post.data,
                    timeToPost: `${timeTemp[2]}-${timeTemp[1]}-${timeTemp[0]} ${time}:00`,
                    shareAccount: shareAccount,
                    shareType: shareType,
                    title: title,
                    interval: interval,
                    interval_type: interval_type
                }
                var header = {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
                callAPI(apiUrl, 'post', postval, header, shareComplete);
                // console.log('post val ', postval)
            }, 'JSON')
        } else {
            let apiUrl = '//b.fffblue.com/huy/index.php?task=addSchedule'
            let postval = {
                postId: POSTID,
                timeToPost: `${timeTemp[2]}-${timeTemp[1]}-${timeTemp[0]} ${time}:00`,
                shareAccount: shareAccount,
                shareType: shareType,
                title: title,
                interval: interval,
                interval_type: interval_type
            }
            var header = {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
            callAPI(apiUrl, 'post', postval, header, shareComplete);
            // console.log('post val ', postval)
        }

    }

    //share complete
    function shareComplete(obj) {
        Swal.close();
        let title = 'Lên lịch cho bài thành công';
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
        getListScheduleAccount();
    }

});