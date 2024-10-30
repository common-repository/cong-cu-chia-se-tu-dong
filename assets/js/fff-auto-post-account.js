var url = new URL(location.href);
var auth_code = url.searchParams.get('auth_code');
var oauth_token = url.searchParams.get('oauth_token');
var oauth_token_secret = url.searchParams.get('oauth_token_secret');
var app_type = url.searchParams.get('app_type');
if(app_type != undefined)
{
    let code =  {
        auth_code:auth_code,
        app_type:app_type,
        oauth_token:oauth_token,
        oauth_token_secret:oauth_token_secret
    }        
    window.opener.loginCallBack(code) ;        
}

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
            break ;
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

    var dataApp = [];
    var currentApp = 'wordpress';
    var isClick = true;      

    if(app_type != undefined)
        currentApp = app_type

    $('.fff-tab').on('click', function () {
        $('.fff-tab').removeClass('fff-is-active')
        $(this).addClass('fff-is-active')
        var data = $(this).data('component');
        currentApp = data ;
        $('.fff-accounts-add-button').attr('data-type', data)

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
        let html = dataApp[data].length == 0 ? isEmpty :  buildHtml(data,dataApp) ;

        $('#fffComponent').html(html);        

        $('.fff-accounts-add-button').on('click', function(){                
            popupAddAccount();
        })

        $('.fff-delete-account-social').on('click', function () {
            var accountType = $(this).data('type');
            var accountId = $(this).data('id');
            deleteAccount({accountType,accountId});
        })
    })

    $('.fff-accounts-add-button').on('click', function () {

        popupAddAccount();

    }) //account add button

    // nodeToggle();
    getListSocialAccount();

    callBackApi = function (obj) {
        getListSocialAccount();
        win.close();
        Swal.close();
    }

    //build html
    function buildHtml(ele, data = []) {
        var html = '';
        switch (ele) {            
            case 'wordpress':
                if(data['wordpress'])
                data['wordpress'].forEach(ele => {
                    let appName = 'FFF Auto Post Wordpress';
                    let accountInfo = ele.info;                    
                    html += `<div class="fff-card fff-account-item mb-2 account${ele.accountId}" >
                                <div class="fff-account-inline">
                                    <div class="fff-account-image">
                                        <img src="https://pbs.twimg.com/profile_images/1250314256806895618/0nNIoWQH_normal.jpg" onerror="fffoster.no_photo( this );">
                                    </div>
                                    <div class="fff-account-name">${appName} - ${accountInfo.email}</div>
                                    <div class="fff-account-is-public fff-tooltip fff-hide" data-title="It is public for all WordPress users">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <a class="fff-account-link fff-tooltip ml-auto" href="${accountInfo.primary_blog_url}" data-title="Profile link" target="_blank"><i class="fas fa-external-link-alt"></i> </a>
                                    <div data-type="wordpress" data-id="${ele.accountId}" class="fff-schedule-control fff-delete-account-social">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </div>`+
                                `
                            </div>`;
                });
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'blogger':
                if(data['blogger'])
                data['blogger'].forEach(ele => {
                    let appName = 'FFF Auto Post Blogger';
                    let accountInfo = ele.info;
                    html += `<div class="fff-card fff-account-item mb-2" >
                                <div class="fff-account-inline">
                                    <div class="fff-account-image">
                                        <img src="https://pbs.twimg.com/profile_images/1250314256806895618/0nNIoWQH_normal.jpg" onerror="fffoster.no_photo( this );">
                                    </div>
                                    <div class="fff-account-name">${appName} - ${accountInfo.displayName}</div>
                                    <div class="fff-account-is-public fff-tooltip fff-hide" data-title="It is public for all WordPress users">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <a class="fff-account-link fff-tooltip ml-auto" href="${accountInfo.url}" data-title="Profile link" target="_blank"><i class="fas fa-external-link-alt"></i> </a>
                                    <div data-type="blogger" data-id="${ele.accountId}" class="fff-schedule-control fff-delete-account-social">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </div>`+
                                `
                        </div>`;
                });
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'medium':
                if(data['medium'])
                data['medium'].forEach(ele => {
                    let appName = 'FFF Auto Post Medium';
                    let accountInfo = ele.info;
                    html+= `<div class="fff-card fff-account-item mb-2" >
                                <div class="fff-account-inline">
                                    <div class="fff-account-image">
                                        <img src="https://pbs.twimg.com/profile_images/1250314256806895618/0nNIoWQH_normal.jpg" onerror="fffoster.no_photo( this );">
                                    </div>
                                    <div class="fff-account-name">${appName} - ${accountInfo.data.name}</div>
                                    <div class="fff-account-is-public fff-tooltip fff-hide" data-title="It is public for all WordPress users">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <a class="fff-account-link fff-tooltip ml-auto" href="https://medium.com/@${accountInfo.data.username}" data-title="Profile link" target="_blank"><i class="fas fa-external-link-alt"></i> </a>
                                    <div data-type="medium" data-id="${ele.accountId}" class="fff-schedule-control fff-delete-account-social">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </div>`+
                                `
                        </div>`;
                });
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'linkedin':
                if(data['linkedin'])
                data['linkedin'].forEach(ele => {
                    let appName = 'FFF Auto Post linkedin';
                    let accountInfo = ele.info;
                    html+= `<div class="fff-card fff-account-item mb-2" >
                                <div class="fff-account-inline">
                                    <div class="fff-account-image">
                                        <img src="https://pbs.twimg.com/profile_images/1250314256806895618/0nNIoWQH_normal.jpg" onerror="fffoster.no_photo( this );">
                                    </div>
                                    <div class="fff-account-name">${appName} - ${accountInfo.localizedFirstName} ${accountInfo.localizedLastName} - <a href="#" target="_blank" >${accountInfo.id}</a></div>
                                    <div class="fff-account-is-public fff-tooltip fff-hide" data-title="It is public for all WordPress users">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <a class="fff-account-link fff-tooltip ml-auto" href="https://www.linkedin.com/in/${accountInfo.id}" data-title="Profile link" target="_blank"><i class="fas fa-external-link-alt"></i> </a>
                                    <div data-type="linkedin" data-id="${ele.accountId}" class="fff-schedule-control fff-delete-account-social">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </div>`+
                                `
                        </div>`;
                });
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'reddit':
                if(data['reddit'])
                data['reddit'].forEach(ele => {
                    let appName = 'FFF Auto Post Reddit';
                    let accountInfo = ele.info;
                    html+= `<div class="fff-card fff-account-item mb-2" >
                                <div class="fff-account-inline">
                                    <div class="fff-account-image">
                                        <img src="https://pbs.twimg.com/profile_images/1250314256806895618/0nNIoWQH_normal.jpg" onerror="fffoster.no_photo( this );">
                                    </div>
                                    <div class="fff-account-name">${appName} - ${accountInfo.subreddit.display_name}</div>
                                    <div class="fff-account-is-public fff-tooltip fff-hide" data-title="It is public for all WordPress users">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <a class="fff-account-link fff-tooltip ml-auto" href="https://www.reddit.com${accountInfo.subreddit.url}" data-title="Profile link" target="_blank"><i class="fas fa-external-link-alt"></i> </a>
                                    <div data-type="reddit" data-id="${ele.accountId}" class="fff-schedule-control fff-delete-account-social">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </div>`+
                                `
                        </div>`;
                });
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'twitter':
                data['twitter'].forEach(ele => {
                    let appName = 'FFF Auto Post Twitter';
                    let accountInfo = ele.info;
                    html+= `<div class="fff-card fff-account-item mb-2" >
                                <div class="fff-account-inline">
                                    <div class="fff-account-image">
                                        <img src="https://pbs.twimg.com/profile_images/1250314256806895618/0nNIoWQH_normal.jpg" onerror="fffoster.no_photo( this );">
                                    </div>
                                    <div class="fff-account-name">${appName} - ${accountInfo.name}</div>
                                    <div class="fff-account-is-public fff-tooltip fff-hide" data-title="It is public for all WordPress users">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <a class="fff-account-link fff-tooltip ml-auto" href="https://twitter.com/${accountInfo.screen_name}" data-title="Profile link" target="_blank"><i class="fas fa-external-link-alt"></i> </a>
                                    <div data-type="twitter" data-id="${ele.accountId}" class="fff-schedule-control fff-delete-account-social">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </div>`+
                                `
                        </div>`;
                });
                html = `<div class="fff-account">${html}</div>`;
                break;
            case 'tumblr':
                data['tumblr'].forEach(ele => {
                    let appName = 'FFF Auto Post Tumblr';
                    let accountInfo = ele.info;
                    let accountName = ele.accountId;
                    html+= `<div class="fff-card fff-account-item mb-2" >
                                <div class="fff-account-inline">
                                    <div class="fff-account-image">
                                        <img src="https://pbs.twimg.com/profile_images/1250314256806895618/0nNIoWQH_normal.jpg" onerror="fffoster.no_photo( this );">
                                    </div>
                                    <div class="fff-account-name">${appName} - ${accountName}</div>
                                    <div class="fff-account-is-public fff-tooltip fff-hide" data-title="It is public for all WordPress users">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <a class="fff-account-link fff-tooltip ml-auto" href="https://www.tumblr.com/blog/${accountInfo.response.user.name}" data-title="Profile link" target="_blank"><i class="fas fa-external-link-alt"></i> </a>
                                    <div data-type="tumblr" data-id="${ele.accountId}" class="fff-schedule-control fff-delete-account-social">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </div>`+
                                `
                        </div>`;
                });
                html = `<div class="fff-account">${html}</div>`;
                break;
            default:
                html = ``;
                break;
        }
        return html;
    }   

    //function popup account
    function popupAddAccount(){
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
                    let domain = ADMIN_WEBSITE + 'admin.php?page=fff_auto_post' ;
                    let data = $('.fff-accounts-add-button').attr('data-type');                    
                    
                    let openURL = `https://b.fffblue.com/huy/login_app.php?app=${data}App&state=${domain}`;
                    win = window.open(openURL, 'fff-auto-post', 'width=750, height=550');
                }
                return false;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // swalWithBootstrapButtons.fire(
                //   'Deleted!',
                //   'Your file has been deleted.',
                //   'success'
                // )
            }
        })
    }

    function getListSocialAccount() {
        let urlAPI = '//b.fffblue.com/huy/index.php?task=listSocialAccount'
        let headers = {
            "Authorization": `Bearer ${ACCESS_TOKEN}`
        }        
        callAPI(urlAPI, 'get', {}, headers, renderAppItem);
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
            $('.fff-accounts-add-button').on('click', function(){
                popupAddAccount();
            })
        } else {            
            for (const [key, value] of Object.entries(data)) {
                dataApp[key] = value;
                accCount+=data[key].length;
            }   
        }

        for (const [key, value] of Object.entries(dataApp)) {
            html+= buildHtml(`${key}`, dataApp);
            $(`.fff-tab[data-component='${key}'] span.fff-tab-all`).html(value.length)
        }
        
        if(dataApp[currentApp].length != 0 )
            $('#fffComponent').html(buildHtml(currentApp,dataApp));        
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
            deleteAccount({accountType,accountId});
        })

        $('.fff-account-link i').on('mouseenter', function(){
            $(this).html('<div class="fffSharePostBtn-tooltip">Link tài khoản</div>')        
        }).on('mouseleave', function(){
            $(this).html('')
        });

        $('.fff-delete-account-social i').on('mouseenter', function(){
            $(this).html('<div class="fffSharePostBtn-tooltip">Xóa</div>')        
        }).on('mouseleave', function(){
            $(this).html('')
        });
    }

    function deleteAccount(obj){        
        let urlAPI = '//b.fffblue.com/huy/index.php?task=delSocialAccount'
        let headers = {
            "Authorization": `Bearer ${ACCESS_TOKEN}`
        }        
        callAPI(urlAPI, 'post', obj, headers, inform);
        // $(`.account${obj.accountId}`).remove();
    }

    function inform(obj){
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
        getListSocialAccount();
    }

});