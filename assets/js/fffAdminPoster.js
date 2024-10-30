jQuery(document).ready(function ($) {

    let postVal = {
        action: 'get_token_fff_auto_post_action'
    }



    $.post(ajaxurl, postVal, function (res) {
        ACCESS_TOKEN = res.token;
        FFF_AUTO_POST_PLUGIN_SETTING_PATH = res.FFF_AUTO_POST_PLUGIN_SETTING_PATH;
    }, 'JSON')

    $('.fffSharePostBtn').on('click', function (e) {
            e.preventDefault();
            Swal.fire({
                customClass: {
                    container: 'fff-modal-loading-container',
                    popup: 'fff-modal-loading',
                },
                html: '',
                // timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            })

            let post_id = $(this).data('wppostid');
            let postVal = {
                // action:'share_post_fff_auto_post_action',
                action: 'get_post_fff_auto_post_action',
                postID: post_id
            }

            $.post(ajaxurl, postVal, function (res) {
                // console.log(res);
                let postVal = res.data;
                postVal.contentFormat = 'html';
                let urlAPI = `//b.fffblue.com/huy/index.php?task=sharePost`;
                var header = {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
                callAPI(urlAPI, 'post', postVal, header, shareComplete);
            }, 'JSON');

        })
        .on('mouseenter', function () {
            $(this).html('<div class="fffSharePostBtn-tooltip">Chia Sẻ</div>')
        })
        .on('mouseleave', function () {
            $(this).html('')
        });

    function shareComplete(obj) {
        let listItem = ``;
        if (obj.status == 'success') {
            let appList = obj.data;
            appList.forEach(ele => {
                if (ele.status == 'success') {
                    let type = getType(ele.app);
                    listItem+=`<div class="fff-log-title-subtext fff-log-title-sublink">
                    <i class="${type.icon}"></i> ${type.title}
                    </div>`;
                }
            });
        }

        Swal.close();
        Swal.fire({
            customClass: {
                container: '',
                popup: 'fff-modal-admin-post',
                confirmButton: 'fff-button',
                header: 'fff-modal-header',
                title: 'fff-modal-title-container',
                content: 'fff-modal-content',
                actions: 'fff-modal-actions',
            },
            title: `
            <div class="fff-modal-title">
                <div class="fff-modal-title-icon">
                    <i class="fas fa-share"></i>
                </div>
                <div class="fff-modal-title-text">Bài của bạn đã được chia sẻ qua</div>
            </div>
            `,
            html: `${listItem}`,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: 'Chi tiết',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = `${FFF_AUTO_POST_PLUGIN_SETTING_PATH}/admin.php?page=fff_auto_post&action=fff-post-logs`;
            }
        })


    }

    function getType(type) {
        let platform = [];
        switch (type) {
            case 'wordpress':
                platform.title = 'Wordpress';
                platform.icon = 'fab fa-wordpress';
                break;
            case 'tumblr':
                platform.title = 'Tumblr';
                platform.icon = 'fab fa-tumblr';
                break;
            case 'facebook':
                platform.title = 'Facebook';
                platform.icon = '';
                break;
            case 'medium':
                platform.title = 'Medium';
                platform.icon = 'fab fa-medium';
                break;
            case 'linkedin':
                platform.title = 'Linkedin';
                platform.icon = 'fab fa-linkedin';
                break;
            case 'twitter':
                platform.title = 'Twitter';
                platform.icon = 'fab fa-twitter';
                break;
            case 'reddit':
                platform.title = 'Reddit';
                platform.icon = 'fab fa-reddit';
                break;
            case 'blogger':
                platform.title = 'Blogger';
                platform.icon = 'fab fa-blogger';
                break;
            default:
                break;
        }
        return platform;
    }

    function callAPI(urlAPI, method, postVal, headers, callBack = undefined) {
        $.ajax({
            url: urlAPI,
            type: method,
            data: postVal,
            headers: headers,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (callBack != undefined)
                    callBack(data);
            }
        });
    }

});