var url = new URL(location.href);
var auth_code = url.searchParams.get('auth_code');
var oauth_token = url.searchParams.get('oauth_token');
var oauth_token_secret = url.searchParams.get('oauth_token_secret');
var app_type = url.searchParams.get('app_type');
if (app_type != undefined) {
    let code = {
        auth_code: auth_code,
        app_type: app_type,
        oauth_token: oauth_token,
        oauth_token_secret: oauth_token_secret
    }
    window.opener.loginCallBack(code);
}

var POSTID = '';
var WPPOSTID = '';
var WPMESSAGE = '';
var win = null;
var callBackApi = null;


function loginCallBack(obj) {
    var postVal;
    var urlAPI;
    var header = {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
    }
    switch (obj.app_type) {
        case 'tumblrApp':
        case 'twitterApp':
            postVal = {
                oauth_token: obj.oauth_token,
                oauth_token_secret: obj.oauth_token_secret,
                app: obj.app_type
            }
            urlAPI = '//b.fffblue.com/huy/index.php?task=addSocialAccount';
            break;
        case 'redditApp':
        case 'wordpressApp':
        case 'mediumApp':
        case 'instagramApp':
        case 'linkedinApp':
        case 'bloggerApp':
            postVal = {
                code: obj.auth_code,
                app: obj.app_type
            }
            urlAPI = '//b.fffblue.com/huy/index.php?task=addSocialAccount';
            break;
    }
    callAPI(urlAPI, 'post', postVal, header, callBackApi);
}

jQuery(document).ready(function ($) {

    var postID = '';

    var dataApp = [];
    var currentApp = 'wordpress';
    var platform_type = 'wordpress';
    var isClick = true;
    var shareAccount = 'all';

    if (app_type != undefined)
        currentApp = app_type

    getListSocialAccount(renderAppItem);

    function ffftab() {
        $('.fff-accounts-add-button').on('click', function () {
            popupAddAccount();
        })

        $('.fff-delete-account-social').on('click', function () {
            var accountType = $(this).data('type');
            var accountId = $(this).data('id');
            deleteAccount({
                accountType,
                accountId
            });
        })

        $('.shareNowBtn').on('click', function () {

            let title = $('#fffShareTitle').val();
            let content = $('#fffShareContent').val();
            let type = $(this).attr('data-type');
            let thumbnail = $('#imgUploadResult').attr('src');
            let share_link = $('#fffShareLink').val();
            let excerpt = $('#fffShareExcerpt').val();;
            var postVal = {
                title: title,
                content: content,
                type: type,
                thumbnail: thumbnail,
                share_link: share_link,
                excerpt: excerpt,
                platform_type: type
            }
            var urlAPI = '';
            var header = {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
            urlAPI = `//b.fffblue.com/huy/index.php?task=sharePostByType`;
            switch (type) {
                case 'all':
                    urlAPI = `//b.fffblue.com/huy/index.php?task=sharePost`;
                    break;
                case 'medium':
                    postVal.contentFormat = 'html';
                    break;
                default:
                    break;
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

            callAPI(urlAPI, 'post', postVal, header, shareComplete);

        })

        $('.saveBtn').on('click', function () {
            Swal.fire({
                customClass: {
                    container: 'fff-modal-loading-container',
                    popup: 'fff-modal-loading'
                },
                showConfirmButton: false,
                showCancelButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            })

            let title = $('#fffShareTitle').val();
            let content = $('#fffShareContent').val();
            let type = $(this).attr('data-type');
            let thumbnail = $('#imgUploadResult').attr('src');
            let share_link = $('#fffShareLink').val();
            let excerpt = $('#fffShareExcerpt').val();
            let platform_type = type;
            var postVal = {
                action: 'create'
            }
            var urlAPI = '';
            var header = {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
            urlAPI = `//b.fffblue.com/huy/index.php?task=postCURD`;
            switch (type) {
                case 'wordpress':
                    postVal.title = title;
                    postVal.content = content;
                    postVal.excerpt = excerpt;
                    postVal.thumbnail = thumbnail;
                    postVal.platform = platform_type;
                    break;
                case 'blogger':
                case 'medium':
                    postVal.title = title;
                    postVal.content = content;
                    postVal.thumbnail = thumbnail;
                    postVal.platform = platform_type;
                    break;
                case 'twitter':
                case 'linkedin':
                case 'tumblr':
                    postVal.excerpt = excerpt;
                    postVal.thumbnail = thumbnail;
                    postVal.platform = platform_type;
                    break;
                case 'reddit':
                    postVal.title = title;
                    postVal.excerpt = excerpt;
                    postVal.platform = platform_type;
                    break;
                default:
                    break;
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

            callAPI(urlAPI, 'post', postVal, header, shareComplete);
            getListPost();

        })

        $('.fff-add-schedule').on('click', function () {
            openSchedulePopup();
            $('.saveScheduleBtn').on('click', function () {
                saveSchedule();
            })
        });

        $('.fffAddSchedule')
            .on('hover', function () {
                $(this).html('<div class="fffAddSchedule-tooltip">Lịch Trình</div>')
            })
            .on('mouseleave', function () {
                $(this).html('')
            });
    }

    $('.fff-tab').on('click', function () {
        $('.fff-tab').removeClass('fff-is-active')
        $(this).addClass('fff-is-active')
        var data = $(this).data('component');
        currentApp = data;
        platform_type = data;
        $('.fff-accounts-add-button').attr('data-type', data);

        let isEmpty = `<div>
                <div class="fff-card fff-emptiness">
                <div class="fff-emptiness-image">
                    <img src="${FFF_AUTO_POST_PLUGIN_URL}assets/images/empty.svg">
                </div>
                <div class="fff-emptiness-text">
                    Chưa có tài khoản trong hệ thống			</div>
                <div class="fff-emptiness-button">
                    <button class="fff-button fff-accounts-add-button" data-type="${data}">
                        <i class="fas fa-plus"></i> <span>THÊM TÀI KHOẢN</span>
                    </button>
                    </div>
                </div>
            </div>`;
        let html = dataApp[data].length == 0 ? isEmpty : buildHtml(data, dataApp);
        $('#fffComponent').html(html);
        WPMedLib();
        getListPost();
        ffftab();
    })

    $('.fff-accounts-add-button').on('click', function () {
        popupAddAccount();
    }) //account add button

    // nodeToggle();


    callBackApi = function (obj) {
        getListSocialAccount(renderAppItem);
        win.close();
        Swal.close();
    }

    //
    function openSchedulePopup() {
        getListSocialAccount(renderAccountItem);
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

                //post interval
                $('.post_freq').on('change', function () {
                    let value = $(this).val();
                    shareType = value;

                    if (value == 'repeated') $('#fffSchedulePostEveryRow').removeClass('fff-hide')
                    else $('#fffSchedulePostEveryRow').addClass('fff-hide')
                })

                $('.fffMetaBoxTab').on('click', function () {
                    shareAccount = $(this).data('tab');
                    platform_type = $(this).data('tab');
                })

            } //on open

        }) //swalfire
    }

    //build html
    function buildHtml(ele, data = []) {
        var html = '';
        switch (ele) {
            case 'wordpress':
                if (data['wordpress']) {
                    let appName = 'FFF Auto Post Wordpress';
                    html += `<div class="fff-card">
                    <div class="fff-card-body">

                        <div class="fff-form-group">
                            <label for="imgUpload">
                                <div id="wpMediaBtn" class="fff-form-image">
                                    <i class="fas fa-camera-retro"></i>
                                </div>
                            </label>
                            <input type="file" id="imgUpload" class="fff-hide">
                            <div id="imageShow" class="fff-form-image-preview fff-hide" data-id="">
                                <img id="imgUploadResult" src="#"> <i class="fas fa-times" id="closeImg"></i>
                            </div>
                        </div>

                        <div id="fffShareURL" class="fff-form-group ">
                            <label>Link</label>
                            <input id="fffShareLink" list="listPost" type="text" class="fff-form-input" placeholder="Link bài viết" value="">
                                <datalist id="listPost"><option value="http://localhost:4000/2020/10/15/hello-world/" data-postid="1">Hello world!</option></datalist>
                        </div>
                        <div class="fff-form-group ">
                            <label>Tiêu đề</label>
                            <input id="fffShareTitle" autocomplete="off" type="text" class="fff-form-input" placeholder="Tiêu đề" value="">
                        </div>
                        <div class="fff-form-group">
                            <label class="fff-is-jb">
                                Miêu tả ngắn
                                <!-- <span>Characters count: <span id="fffShareCharCount">0</span></span> -->
                            </label>
                            <textarea id="fffShareExcerpt" class="fff-form-input message_box" placeholder="Nội dung" maxlength="500"></textarea>
                        </div>
                        <div class="fff-form-group">
                            <label class="fff-is-jb">
                                Nội dung chia sẻ
                                <!-- <span>Characters count: <span id="fffShareCharCount">0</span></span> -->
                            </label>
                            <textarea id="fffShareContent" class="fff-form-input message_box" placeholder="Nội dung" maxlength="500"></textarea>
                        </div>
                    </div>
                    <div class="fff-card-footer">
                        <button type="button" class="fff-button shareNowBtn" data-type="wordpress">Chia sẻ</button>
                        <button type="button" class="fff-button fff-is-info fff-add-schedule" data-type="wordpress">Lên lịch</button>
                        <button type="button" class="fff-button fff-is-gray saveBtn" data-type="wordpress">Lưu bài viết</button> 
                    </div>
                </div>`;
                }
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'blogger':
                if (data['blogger']) {
                    let appName = 'FFF Auto Post Blogger';
                    html += `<div class="fff-card">
                    <div class="fff-card-body">

                        <div class="fff-form-group">
                            <label for="imgUpload">
                                <div id="wpMediaBtn" class="fff-form-image">
                                    <i class="fas fa-camera-retro"></i>
                                </div>
                            </label>
                            <input type="file" id="imgUpload" class="fff-hide">
                            <div id="imageShow" class="fff-form-image-preview fff-hide" data-id="">
                                <img id="imgUploadResult" src="#"> <i class="fas fa-times" id="closeImg"></i>
                            </div>
                        </div>

                        <div id="fffShareURL" class="fff-form-group ">
                            <label>Link</label>
                            <input id="fffShareLink" list="listPost" type="text" class="fff-form-input" placeholder="Link bài viết" value="">
                                <datalist id="listPost"><option value="http://localhost:4000/2020/10/15/hello-world/" data-postid="1">Hello world!</option></datalist>
                        </div>
                        <div class="fff-form-group ">
                            <label>Tiêu đề</label>
                            <input id="fffShareTitle" autocomplete="off" type="text" class="fff-form-input" placeholder="Tiêu đề" value="">
                        </div>
                        <div class="fff-form-group">
                            <label class="fff-is-jb">
                                Nội dung chia sẻ
                                <!-- <span>Characters count: <span id="fffShareCharCount">0</span></span> -->
                            </label>
                            <textarea id="fffShareContent" class="fff-form-input message_box" placeholder="Nội dung" maxlength="500"></textarea>
                        </div>
                    </div>
                    <div class="fff-card-footer">
                        <button type="button" class="fff-button shareNowBtn" data-type="blogger">Chia sẻ</button>
                        <button type="button" class="fff-button fff-is-info fff-add-schedule" data-type="blogger">Lên lịch</button>
                        <button type="button" class="fff-button fff-is-gray saveBtn" data-type="blogger">Lưu bài viết</button> 
                    </div>
                </div>`;
                }
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'medium':
                if (data['medium']) {
                    let appName = 'FFF Auto Post Medium';
                    html += `<div class="fff-card">
                    <div class="fff-card-body">

                        <div class="fff-form-group">
                            <label for="imgUpload">
                                <div id="wpMediaBtn" class="fff-form-image">
                                    <i class="fas fa-camera-retro"></i>
                                </div>
                            </label>
                            <input type="file" id="imgUpload" class="fff-hide">
                            <div id="imageShow" class="fff-form-image-preview fff-hide" data-id="">
                                <img id="imgUploadResult" src="#"> <i class="fas fa-times" id="closeImg"></i>
                            </div>
                        </div>

                        <div id="fffShareURL" class="fff-form-group ">
                            <label>Link</label>
                            <input id="fffShareLink" list="listPost" type="text" class="fff-form-input" placeholder="Link bài viết" value="">
                                <datalist id="listPost"><option value="http://localhost:4000/2020/10/15/hello-world/" data-postid="1">Hello world!</option></datalist>
                        </div>
                        <div class="fff-form-group ">
                            <label>Tiêu đề</label>
                            <input id="fffShareTitle" autocomplete="off" type="text" class="fff-form-input" placeholder="Tiêu đề" value="">
                        </div>
                        <div class="fff-form-group">
                            <label class="fff-is-jb">
                                Nội dung chia sẻ
                                <!-- <span>Characters count: <span id="fffShareCharCount">0</span></span> -->
                            </label>
                            <textarea id="fffShareContent" class="fff-form-input message_box" placeholder="Nội dung" maxlength="500"></textarea>
                        </div>
                    </div>
                    <div class="fff-card-footer">
                        <button type="button" class="fff-button shareNowBtn" data-type="medium">Chia sẻ</button>
                        <button type="button" class="fff-button fff-is-info fff-add-schedule" data-type="medium">Lên lịch</button>
                        <button type="button" class="fff-button fff-is-gray saveBtn" data-type="medium">Lưu bài viết</button> 
                    </div>
                </div>`;
                };
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'linkedin':
                if (data['linkedin']) {
                    let appName = 'FFF Auto Post linkedin';
                    html += `<div class="fff-card">
                    <div class="fff-card-body">

                        <div class="fff-form-group">
                            <label for="imgUpload">
                                <div id="wpMediaBtn" class="fff-form-image">
                                    <i class="fas fa-camera-retro"></i>
                                </div>
                            </label>
                            <input type="file" id="imgUpload" class="fff-hide">
                            <div id="imageShow" class="fff-form-image-preview fff-hide" data-id="">
                                <img id="imgUploadResult" src="#"> <i class="fas fa-times" id="closeImg"></i>
                            </div>
                        </div>

                        <div id="fffShareURL" class="fff-form-group ">
                            <label>Link</label>
                            <input id="fffShareLink" list="listPost" type="text" class="fff-form-input" placeholder="Link bài viết" value="">
                                <datalist id="listPost"><option value="http://localhost:4000/2020/10/15/hello-world/" data-postid="1">Hello world!</option></datalist>
                        </div>
                        <div class="fff-form-group">
                        <label class="fff-is-jb">
                            Miêu tả ngắn
                            <!-- <span>Characters count: <span id="fffShareCharCount">0</span></span> -->
                        </label>
                            <textarea id="fffShareExcerpt" class="fff-form-input message_box" placeholder="Nội dung" maxlength="500"></textarea>
                        </div>
                    </div>
                    <div class="fff-card-footer">
                        <button type="button" class="fff-button shareNowBtn" data-type="linkedin">Chia sẻ</button>
                        <button type="button" class="fff-button fff-is-info fff-add-schedule" data-type="linkedin">Lên lịch</button>
                        <button type="button" class="fff-button fff-is-gray saveBtn" data-type="linkedin">Lưu bài viết</button> 
                    </div>
                </div>`;
                };
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'reddit':
                if (data['reddit']) {
                    let appName = 'FFF Auto Post Reddit';
                    html += `<div class="fff-card">
                    <div class="fff-card-body">

                        <div class="fff-form-group">
                            <label for="imgUpload">
                                <div id="wpMediaBtn" class="fff-form-image">
                                    <i class="fas fa-camera-retro"></i>
                                </div>
                            </label>
                            <input type="file" id="imgUpload" class="fff-hide">
                            <div id="imageShow" class="fff-form-image-preview fff-hide" data-id="">
                                <img id="imgUploadResult" src="#"> <i class="fas fa-times" id="closeImg"></i>
                            </div>
                        </div>

                        <div id="fffShareURL" class="fff-form-group ">
                            <label>Link</label>
                            <input id="fffShareLink" list="listPost" type="text" class="fff-form-input" placeholder="Link bài viết" value="">
                                <datalist id="listPost"><option value="http://localhost:4000/2020/10/15/hello-world/" data-postid="1">Hello world!</option></datalist>
                        </div>
                        <div class="fff-form-group ">
                            <label>Tiêu đề</label>
                            <input id="fffShareTitle" autocomplete="off" type="text" class="fff-form-input" placeholder="Tiêu đề" value="">
                        </div>
                        <div class="fff-form-group">
                            <label class="fff-is-jb">
                                Nội dung chia sẻ
                                <!-- <span>Characters count: <span id="fffShareCharCount">0</span></span> -->
                            </label>
                            <textarea id="fffShareContent" class="fff-form-input message_box" placeholder="Nội dung" maxlength="500"></textarea>
                        </div>
                    </div>
                    <div class="fff-card-footer">
                        <button type="button" class="fff-button shareNowBtn" data-type="reddit">Chia sẻ</button>
                        <button type="button" class="fff-button fff-is-info fff-add-schedule" data-type="reddit">Lên lịch</button>
                        <button type="button" class="fff-button fff-is-gray saveBtn" data-type="reddit">Lưu bài viết</button> 
                    </div>
                </div>`;
                };
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'twitter':
                if (data['twitter']) {
                    let appName = 'FFF Auto Post Twitter';
                    html += `<div class="fff-card">
                    <div class="fff-card-body">

                        <div class="fff-form-group">
                            <label for="imgUpload">
                                <div id="wpMediaBtn" class="fff-form-image">
                                    <i class="fas fa-camera-retro"></i>
                                </div>
                            </label>
                            <input type="file" id="imgUpload" class="fff-hide">
                            <div id="imageShow" class="fff-form-image-preview fff-hide" data-id="">
                                <img id="imgUploadResult" src="#"> <i class="fas fa-times" id="closeImg"></i>
                            </div>
                        </div>

                        <div id="fffShareURL" class="fff-form-group ">
                            <label>Link</label>
                            <input id="fffShareLink" list="listPost" type="text" class="fff-form-input" placeholder="Link bài viết" value="">
                                <datalist id="listPost"><option value="http://localhost:4000/2020/10/15/hello-world/" data-postid="1">Hello world!</option></datalist>
                        </div>
                        <div class="fff-form-group">
                        <label class="fff-is-jb">
                            Miêu tả ngắn
                            <!-- <span>Characters count: <span id="fffShareCharCount">0</span></span> -->
                        </label>
                            <textarea id="fffShareExcerpt" class="fff-form-input message_box" placeholder="Nội dung" maxlength="500"></textarea>
                        </div>
                    </div>
                    <div class="fff-card-footer">
                        <button type="button" class="fff-button shareNowBtn" data-type="twitter">Chia sẻ</button>
                        <button type="button" class="fff-button fff-is-info fff-add-schedule" data-type="twitter">Lên lịch</button>
                        <button type="button" class="fff-button fff-is-gray saveBtn" data-type="twitter">Lưu bài viết</button> 
                    </div>
                </div>`;
                };
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'tumblr':
                if (data['tumblr']) {
                    let appName = 'FFF Auto Post Tumblr';
                    html += `<div class="fff-card">
                    <div class="fff-card-body">

                        <div class="fff-form-group">
                            <label for="imgUpload">
                                <div id="wpMediaBtn" class="fff-form-image">
                                    <i class="fas fa-camera-retro"></i>
                                </div>
                            </label>
                            <input type="file" id="imgUpload" class="fff-hide">
                            <div id="imageShow" class="fff-form-image-preview fff-hide" data-id="">
                                <img id="imgUploadResult" src="#"> <i class="fas fa-times" id="closeImg"></i>
                            </div>
                        </div>

                        <div id="fffShareURL" class="fff-form-group ">
                            <label>Link</label>
                            <input id="fffShareLink" list="listPost" type="text" class="fff-form-input" placeholder="Link bài viết" value="">
                                <datalist id="listPost"><option value="http://localhost:4000/2020/10/15/hello-world/" data-postid="1">Hello world!</option></datalist>
                        </div>
                        <div class="fff-form-group">
                        <label class="fff-is-jb">
                            Miêu tả ngắn
                            <!-- <span>Characters count: <span id="fffShareCharCount">0</span></span> -->
                        </label>
                            <textarea id="fffShareExcerpt" class="fff-form-input message_box" placeholder="Nội dung" maxlength="500"></textarea>
                        </div>
                    </div>
                    <div class="fff-card-footer">
                        <button type="button" class="fff-button shareNowBtn" data-type="tumblr">Chia sẻ</button>
                        <button type="button" class="fff-button fff-is-info fff-add-schedule" data-type="tumblr">Lên lịch</button>
                        <button type="button" class="fff-button fff-is-gray saveBtn" data-type="tumblr">Lưu bài viết</button> 
                    </div>
                </div>`;
                };
                html = `<div class="fff-account">${html}</div>`;
                break;
            default:
                html = ``;
                break;
        }
        return html;
    }

    //function popup account
    function popupAddAccount() {
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
                confirmButton: 'fff-button',
                denyButton: '',
                cancelButton: 'fff-button fff-is-gray',
                footer: '',
            },
            width: 560,
            heightAuto: false,
            position: '',
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
                    <div class="fff-modal-title-text">Thêm tài khoản</div>
                </div>
            `,
            icon: '',
            html: `
                <p class="fff-modal-p fff-is-jb">
                Chọn phương thức thêm tài khoản
                </p>
                <div class="fff-modal-options">
                    <div class="fff-modal-option fff-is-selected" data-step="1" style="width:50%">
                        <div class="fff-modal-option-image">
                            <img src="${FFF_AUTO_POST_PLUGIN_URL}assets/images/android.svg">
                        </div>
                        <span class="fff-tooltip" data-title="Recommended">Phương thức App</span>
                    </div>
                    <!--<div class="fff-modal-option" data-step="2">
                        <div class="fff-modal-option-image">
                            <img src="${FFF_AUTO_POST_PLUGIN_URL}assets/images/rocket.svg">
                        </div> Cookie method		</div> -->
                </div>
                <div id="fffModalStep_1" class="fff-modal-step">
                    <div class="fff-form-group modal-form">
                        <label>Chọn App</label>
                        <select class="fff-form-select" id="fffModalAppSelector">
                                                <option value="13" data-is-standart="1">FFF Auto Post</option>
                                        </select>
                    </div>
                </div>
                <div id="fffModalStep_2" class="fff-modal-step fff-hide">
                    <div class="fff-form-group modal-form">
                        <label>Enter the cookie c_user</label>
                        <div class="fff-form-input-has-icon">
                            <i class="fas fa-user"></i>
                            <input id="fffCookie_c_user" autocomplete="off" class="fff-form-input" placeholder="Enter the cookie c_user">
                        </div>
                    </div>
                    <div class="fff-form-group modal-form">
                        <label>Enter the cookie xs</label>
                        <div class="fff-form-input-has-icon">
                            <i class="fas fa-key"></i>
                            <input id="fffCookie_xs" autocomplete="off" class="fff-form-input" placeholder="Enter the cookie xs">
                        </div>
                    </div>
                </div>                
                <div id="fffProxyContainer" class="fff-form-group modal-form fff-hide fff-proxy-container">
                    <div class="fff-form-input-has-icon">
                        <i class="fas fa-globe"></i>
                        <input id="fffProxy" autocomplete="off" class="fff-form-input fff-proxy" placeholder="Enter a proxy address">
                    </div>
                </div>
                `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Lưu lại',
            confirmButtonAriaLabel: '',
            cancelButtonText: 'Đóng',
            cancelButtonAriaLabel: '',
            showLoaderOnConfirm: true,
            onOpen: () => {
                isClick = true;
                $('.fff-modal-option').on('click', function () {
                    var step = $(this).data('step');
                    $('.fff-modal-option').removeClass('fff-is-selected');
                    $(this).addClass('fff-is-selected');

                    switch (step) {
                        case 1:
                            $('#fffModalStep_1').removeClass('fff-hide');
                            $('#fffModalStep_2').addClass('fff-hide');
                            break;
                        case 2:
                            $('#fffModalStep_1').addClass('fff-hide');
                            $('#fffModalStep_2').removeClass('fff-hide');
                            break;
                        default:
                            break;
                    }

                })

            }, //on open
            preConfirm: (evt) => {
                if (isClick) {
                    isClick = false;
                    let domain = ADMIN_WEBSITE + 'admin.php?page=fff_auto_post';
                    let data = $('.fff-accounts-add-button').attr('data-type');

                    let openURL = `https://b.fffblue.com/huy/login_app.php?app=${data}App&state=${domain}`;
                    win = window.open(openURL, 'fff-auto-post', 'width=750, height=550');
                }
                return false;
            },
        }).then((result) => {
            console.log('click click', result);
            if (result.isConfirmed) {
                // swalWithBootstrapButtons.fire(
                //   'Deleted!',
                //   'Your file has been deleted.',
                //   'success'
                // )
            }
        })
    }

    function getListSocialAccount(callback) {
        let urlAPI = '//b.fffblue.com/huy/index.php?task=listSocialAccount'
        let headers = {
            "Authorization": `Bearer ${ACCESS_TOKEN}`
        }
        callAPI(urlAPI, 'get', {}, headers, callback);
    }

    function renderAppItem(obj) {
        dataApp = [];
        let data = obj.data;
        let accCount = 0;
        let html = '';
        if (data.length == 0) {
            $('#fffComponent').html(`<div>
            <div class="fff-card fff-emptiness">
            <div class="fff-emptiness-image">
                <img src="${FFF_AUTO_POST_PLUGIN_URL}assets/images/empty.svg">
            </div>
            <div class="fff-emptiness-text">
                Chưa có trang web nào trong hệ thống			</div>
            <div class="fff-emptiness-button">
                <button class="fff-button fff-accounts-add-button" data-load-modal="add_wordpress_site">
                    <i class="fas fa-plus"></i> <span>THÊM TÀI KHOẢN</span>
                </button>
                </div>
            </div>
            </div>`);
            $('.fff-accounts-add-button').on('click', function () {
                popupAddAccount();
            })
        } else {
            for (const [key, value] of Object.entries(data)) {
                dataApp[key] = value;
                accCount += data[key].length;
            }
        }

        for (const [key, value] of Object.entries(dataApp)) {
            html += buildHtml(`${key}`, dataApp);
            $(`.fff-tab[data-component='${key}'] span.fff-tab-all`).html(value.length)
        }

        if (dataApp[currentApp].length != 0)
            $('#fffComponent').html(buildHtml(currentApp, dataApp));
        else {
            let isEmpty = `<div>
                <div class="fff-card fff-emptiness">
                <div class="fff-emptiness-image">
                    <img src="${FFF_AUTO_POST_PLUGIN_URL}assets/images/empty.svg">
                </div>
                <div class="fff-emptiness-text">
                    Chưa có tài khoản trong hệ thống			</div>
                <div class="fff-emptiness-button">
                    <button class="fff-button fff-accounts-add-button" data-type="${currentApp}">
                        <i class="fas fa-plus"></i> <span>THÊM TÀI KHOẢN</span>
                    </button>
                    </div>
                </div>
            </div>`;
            $('#fffComponent').html(isEmpty);
        }

        $('.fff-title-count').html(accCount);
        $('.fff-delete-account-social').on('click', function () {
            var accountType = $(this).data('type');
            var accountId = $(this).data('id');
            deleteAccount({
                accountType,
                accountId
            });
        })

        $('.fff-account-link i').on('mouseenter', function () {
            $(this).html('<div class="fffSharePostBtn-tooltip">Link tài khoản</div>')
        }).on('mouseleave', function () {
            $(this).html('')
        });

        $('.fff-delete-account-social i').on('mouseenter', function () {
            $(this).html('<div class="fffSharePostBtn-tooltip">Xóa</div>')
        }).on('mouseleave', function () {
            $(this).html('')
        });
        getListPost();
        WPMedLib();
        ffftab();
    }

    function deleteAccount(obj) {
        let urlAPI = '//b.fffblue.com/huy/index.php?task=delSocialAccount'
        let headers = {
            "Authorization": `Bearer ${ACCESS_TOKEN}`
        }
        callAPI(urlAPI, 'post', obj, headers, inform);

        // console.log(obj.accountId);
        // $(`.account${obj.accountId}`).remove();
    }

    function inform(obj) {
        let title = 'Xóa tài khoản thành công';
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
        getListSocialAccount(renderAppItem);
    }

    function getListPost() {
        $('#fffListPost').html(`<div class="swal2-actions swal2-loading" style="display: flex;"><button type="button" class="swal2-confirm swal2-styled" aria-label="" style="display: inline-block; border-left-color: rgb(48, 133, 214); border-right-color: rgb(48, 133, 214);" disabled="">OK</button><button type="button" class="swal2-cancel swal2-styled" aria-label="" style="display: none;">Cancel</button></div>`)
        var urlAPI = `//b.fffblue.com/huy/index.php?task=getPostByPlatform&platform=${platform_type}`;
        var header = {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
        callAPI(urlAPI, 'get', {}, header, renderPostItem);

        // get post current site		
        let postVal = {
            action: 'get_posts_fff_auto_post_action'
        }
        $.post(ajaxurl, postVal, function (res) {
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


    function renderPostItem(obj) {
       
        let data = obj.data;
        let html = '';
        data.forEach(ele => {
            html += `<div class="fff-share-post" data-id="${ele.id}">
					<div class="fff-share-post-id">${ele.id}</div>
					<div class="fff-share-post-title">
						<a href="">${ele.title}</a>
					</div>
					<div class="fff-share-post-date">${ele.created_date}</div>
					<div class="fff-share-post-controls btn">
                        <i class="fas fa-rocket fffSharePostBtn" data-postid="${ele.id}" data-type="${currentApp}"></i>
                        <i class="fas fa-history fffSchedulePostBtn" data-postid="${ele.id}" data-type="${currentApp}"></i>
						<i class="fas fa-trash fff-tooltip fff-icon-button delete_post_btn" data-postid="${ele.id}" data-type="${currentApp}"></i>
					</div>
				</div>
				`;
        });

        $('.fff-title-count-post').html(data.length);

        $('#fffListPost').html(html);

        $('.delete_post_btn').click(function () {
            Swal.fire({
                customClass: {
                    container: 'fff-modal-loading-container',
                    popup: 'fff-modal-loading'
                },
                showConfirmButton: false,
                showCancelButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            })

            let postid = $(this).data('postid');
            var urlAPI = '//b.fffblue.com/huy/index.php?task=postCURD';
            var header = {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
            let postVal = {
                id: postid,
                action: 'delete'
            }
            callAPI(urlAPI, 'post', postVal, header, deleteComplete);
            
        }).on('mouseenter', function () {
            $(this).html('<div class="fffSharePostBtn-tooltip">Xóa</div>')
        }).on('mouseleave', function () {
            $(this).html('')
        });

        $('.fffSharePostBtn').on('click', function () {
            let postId = $(this).data('postid');
            let post_type = $(this).data('type');
            var urlAPI = '//b.fffblue.com/huy/index.php?task=getPostByUser';
            var header = {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
            callAPI(urlAPI, 'get', {}, header, sharePostById);

            function sharePostById(data) {
                // console.log('data ', data, 'postId', postId)
                if (data.status == 'success')
                    data.data.forEach(ele => {
                        if (ele.id == postId) {

                            let title = ele.title;
                            let content = ele.content;
                            let type = post_type;
                            let thumbnail = ele.thumbnail;
                            let share_link = ele.original_url;
                            let excerpt = ele.excerpt;

                            let postVal = {
                                title: title,
                                content: content,
                                type: type,
                                thumbnail: thumbnail,
                                share_link: share_link,
                                excerpt: excerpt
                            }
                            let urlAPI = '';
                            var header = {
                                'Authorization': `Bearer ${ACCESS_TOKEN}`
                            }
                            urlAPI = `//b.fffblue.com/huy/index.php?task=sharePostByType`;
                            switch (type) {
                                case 'all':
                                    urlAPI = `//b.fffblue.com/huy/index.php?task=sharePost`;
                                    break;
                                case 'medium':
                                    postVal.contentFormat = 'html';
                                    break;
                                default:
                                    break;
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

                            callAPI(urlAPI, 'post', postVal, header, shareComplete);

                        }
                    }) //data foreach
            } //function sharePostById

        }).on('mouseenter', function () {
            $(this).html('<div class="fffSharePostBtn-tooltip">Chia sẻ</div>')
        }).on('mouseleave', function () {
            $(this).html('')
        });

        $('.fffSchedulePostBtn').on('mouseenter', function () {
            $(this).html('<div class="fffSharePostBtn-tooltip">Lên lịch</div>')
        }).on('mouseleave', function () {
            $(this).html('')
        });

        $('.fffSchedulePostBtn').on('click', function () {

            let postid = $(this).data('postid');
            let type = $(this).data('type');
            getListSocialAccount(renderAccountItem);
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
                <div class="fff-modal-tab fff-is-active" data-step="1" style="justify-content: flex-start;">
                <span>1</span>Thông tin</div>
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

            `,
                onOpen: () => {

                    var dateNow = new Date();
                    $('input.hasDatepicker').datepicker({
                        classes: 'fff-modal-datepicker',
                        dateFormat: 'dd/mm/yyyy'
                    })
                    $('.hasDatepicker').val(dateNow.getDate() + '/' + dateNow.getMonth() + '/' + dateNow.getFullYear());
                    var time = `${dateNow.getHours()}:${dateNow.getMinutes() < 10 ? '0'+dateNow.getMinutes():dateNow.getMinutes()}`
                    $('.schedule_input_start_time').val(time);

                    //post interval
                    $('.post_freq').on('change', function () {
                        let value = $(this).val();
                        shareType = value;

                        if (value == 'repeated') $('#fffSchedulePostEveryRow').removeClass('fff-hide')
                        else $('#fffSchedulePostEveryRow').addClass('fff-hide')
                    })

                    $('.saveScheduleBtn').on('click', function () {
                        let title = $('.schedule_input_title').val();
                        let interval = $('.interval').val();
                        let interval_type = $('.interval_type').val();
                        let timeTemp = $('.schedule_input_start_date').val().split('/');
                        let time = $('.schedule_input_start_time').val();
                        shareType = $('.post_freq').val();

                        let apiUrl = '//b.fffblue.com/huy/index.php?task=addSchedule'
                        let postval = {
                            postId: postid,
                            timeToPost: `${timeTemp[2]}-${timeTemp[1]}-${timeTemp[0]} ${time}:00`,
                            shareAccount: currentApp,
                            shareType: shareType,
                            platform_type: platform_type,
                            title: title,
                            interval: interval,
                            interval_type: interval_type
                        }
                        var header = {
                            'Authorization': `Bearer ${ACCESS_TOKEN}`
                        }
                        callAPI(apiUrl, 'post', postval, header, shareComplete);
                        
                    })

                } //on open

            }) //swalfire

        }) //schedule button

    }

    function WPMedLib() {
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
    }

    function saveSchedule() {

        
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
                    platform_type: platform_type,
                    title: title,
                    interval: interval,
                    interval_type: interval_type
                }
                var header = {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
                callAPI(apiUrl, 'post', postval, header);
                
            }, 'JSON')
        } else {
            let apiUrl = '//b.fffblue.com/huy/index.php?task=addSchedule'
            let postval = {
                postId: POSTID,
                timeToPost: `${timeTemp[2]}-${timeTemp[1]}-${timeTemp[0]} ${time}:00`,
                shareAccount: shareAccount,
                shareType: shareType,
                platform_type: platform_type,
                title: title,
                interval: interval,
                interval_type: interval_type
            }
            var header = {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
            callAPI(apiUrl, 'post', postval, header);
            
        }

    }

    //renderAccountItem
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

    //html share account
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

    //share complete
    function shareComplete(obj) {
        Swal.close();
        let title = 'Share bài thành công';
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

});