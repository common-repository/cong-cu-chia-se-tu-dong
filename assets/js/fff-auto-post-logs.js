
jQuery(document).ready(function ($) {

    getListLogs();
    function getListLogs() {        
        var urlAPI = 'http://b.fffblue.com/huy/index.php?task=listLogs&page=1';
        var header = {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
        callAPI(urlAPI, 'get', {}, header, buildHtmlLogs);
    }

    function buildHtmlLogs(obj){
        
        let html = '';
        if (obj.status == 'success') {
            
            $('.fff-title-count').html(Object.keys(obj.data.logs).length);
            for (const key in obj.data.logs) {
                let data = obj.data.logs[key];
                let title = data.title == null ? `Bài đã đăng ID ${data.id}` : data.title;
                let date = data.created_date;
                let url = data.shared_link;
                // let statusClass = data.status == 'pending' ? 'fff-is-warning' : 'fff-is-success';
                let statusClass = 'fff-is-success';
                let type = getType(data.type);

                html+=`
                <div class="fff-log">
						<!--<div class="fff-log-image">
							<img src="">
                        </div>-->
                        <div class="fff-schedule-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
						<div class="fff-log-title">
							<div class="fff-log-title-text">
								${title}
								<!--<a target="_blank" href="" class="fff-tooltip"
									data-title="Profile link">
									<i class="fas fa-external-link-alt"></i>
								</a>-->
							</div>
							<div class="fff-log-title-subtext">
								${date}
							</div>
						</div>
						<div class="fff-log-title fff-is-second">
							<div class="fff-log-title-link">
								<a target="_blank" href="${url}">
									<i class="fas fa-external-link-alt"></i>
									Đường dẫn đến bài đăng
								</a>
							</div>
							<div class="fff-log-title-subtext fff-log-title-sublink">
								<i class="${type.icon}"></i> ${type.title}
							</div>
						</div>
						<div class="fff-log-status-container">
                            <div class="fff-status ${statusClass}"><i class="fas fa-check"></i>Thành công</div>
                            <button type="button" class="fff-button fff-is-info" data-id="" data-status="">
                                <i class="fas fa-link"></i>
                            </button>
						</div>
                    </div>
                    `;
            }
        }
        $('#fffLogs').html(html);

        $('.fff-log-status-container .fff-is-info').on('mouseenter', function(){
            $(this).find('i').html('<div class="fffSharePostBtn-tooltip">Index link</div>')        
        }).on('mouseleave', function(){
            $(this).find('i').html('')
        });

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

});