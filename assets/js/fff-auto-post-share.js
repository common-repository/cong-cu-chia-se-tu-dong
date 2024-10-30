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

	var postID = '';
	var originalUrl = '';
	var attachmentURL = '';
	var data_tab = 'all';
	getListPost();
	getListSocialAccount();

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
			share_link:share_link,
			excerpt: excerpt
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

		let postVal = {
			action: 'add_post_fff_auto_post_action',
			postID: postID,
			message: $('#fffShareContent').val()
		}
		$.post(ajaxurl, postVal, function (res) {
			Swal.close();
			POSTID = res.postID;
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
				icon: 'success',
				title: 'Bài viết đã được lưu'
			})

			getListPost();

		}, 'JSON')

	})

	$('.fff-metabox-add').on('click', function () {
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
				footer: '',
			},
			width: 560,
			heightAuto: false,
			position: 'top-end',
			showClass: {
				popup: 'animate__animated animate__fadeInRight'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutRight'
			},
			title: `
            <div class="fff-modal-title">
                <div class="fff-modal-title-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="fff-modal-title-text">Select accounts
                </div>
            </div>
            `,
			icon: '',
			html: `
            <div class="fff-modal-step">
			<div class="fff-form-group">
				<label>Search account</label>
				<div class="fff-form-input-has-icon">
					<i class="fas fa-search"></i>
					<input autocomplete="off" class="fff-form-input fff-search-account" placeholder="Search">
				</div>
			</div>
			<div class="fff-metabox-modal-accounts">
				<div class="fff-metabox-account" data-id="fb:account:16">
					<div class="fff-metabox-account-image">
						<img src="https://graph.facebook.com/1075741306128306/picture?redirect=1&amp;height=40&amp;width=40&amp;type=normal" onerror="fffoster.no_photo( this );">
					</div>
					<div class="fff-metabox-account-label">
						<a href="https://fb.com/me" target="_blank" class="fff-metabox-account-text">
							FS Poster
						</a>
						<div class="fff-metabox-account-subtext">
							<i class="far fa-paper-plane"></i>&nbsp;Fb <i class="fa fa-chevron-right "></i> account
						</div>
					</div>
				</div><div class="fff-metabox-account fff-is-sub" data-id="fb:group:49">
					<div class="fff-metabox-account-image">
						<img src="https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/5_2zSM9mMSk.png" onerror="fffoster.no_photo( this );">
					</div>
					<div class="fff-metabox-account-label">
						<a href="https://fb.com/582784935666114" target="_blank" class="fff-metabox-account-text">
							FS Poster
						</a>
						<div class="fff-metabox-account-subtext">
							<i class="far fa-paper-plane"></i>&nbsp;Fb <i class="fa fa-chevron-right "></i> group
						</div>
					</div>
				</div><div class="fff-metabox-account fff-is-disabled" data-id="google_b:account:10">
					<div class="fff-metabox-account-image">
						<img src="https://lh3.googleusercontent.com/ogw/ADGmqu-Knm5u4MPeMNxaQy2dKWJkb1D3xpgXEieqvAwP=s83-c-mo" onerror="fffoster.no_photo( this );">
					</div>
					<div class="fff-metabox-account-label">
						<a href="https://business.google.com/locations" target="_blank" class="fff-metabox-account-text">
							
						</a>
						<div class="fff-metabox-account-subtext">
							<i class="far fa-paper-plane"></i>&nbsp;Google_b <i class="fa fa-chevron-right "></i> account
						</div>
					</div>
				</div><div class="fff-metabox-account fff-is-sub" data-id="google_b:location:27">
					<div class="fff-metabox-account-image">
						<img src="https://ssl.gstatic.com/images/branding/product/2x/google_my_business_32dp.png" onerror="fffoster.no_photo( this );">
					</div>
					<div class="fff-metabox-account-label">
						<a href="https://business.google.com/posts/l/14093728462908251936" target="_blank" class="fff-metabox-account-text">
							FS Poster
						</a>
						<div class="fff-metabox-account-subtext">
							<i class="far fa-paper-plane"></i>&nbsp;Google_b <i class="fa fa-chevron-right "></i> location
						</div>
					</div>
				</div><div class="fff-metabox-account" data-id="linkedin:account:4">
					<div class="fff-metabox-account-image">
						<img src="https://demo.fs-poster.com/wp-content/plugins/fs-poster/App/Pages/Base/Assets/img/no-photo.png" onerror="fffoster.no_photo( this );">
					</div>
					<div class="fff-metabox-account-label">
						<a href="https://www.linkedin.com/in/" target="_blank" class="fff-metabox-account-text">
							FS Poster
						</a>
						<div class="fff-metabox-account-subtext">
							<i class="far fa-paper-plane"></i>&nbsp;Linkedin <i class="fa fa-chevron-right "></i> account
						</div>
					</div>
				</div><div class="fff-metabox-account fff-is-sub" data-id="linkedin:company:7">
					<div class="fff-metabox-account-image">
						<img src="https://demo.fs-poster.com/wp-content/plugins/fs-poster/App/Pages/Base/Assets/img/no-photo.png" onerror="fffoster.no_photo( this );">
					</div>
					<div class="fff-metabox-account-label">
						<a href="https://www.linkedin.com/company/42828052" target="_blank" class="fff-metabox-account-text">
							FS Poster
						</a>
						<div class="fff-metabox-account-subtext">
							<i class="far fa-paper-plane"></i>&nbsp;Linkedin <i class="fa fa-chevron-right "></i> company
						</div>
					</div>
				</div><div class="fff-metabox-account" data-id="ok:account:9">
					<div class="fff-metabox-account-image">
						<img src="https://i.mycdn.me/image?id=951375483648&amp;t=32&amp;plc=API&amp;ts=0000000040000002ea&amp;aid=1273143296&amp;tkn=*LzztntWqDXLX-f0JHIXqDZcqmiM" onerror="fffoster.no_photo( this );">
					</div>
					<div class="fff-metabox-account-label">
						<a href="https://ok.ru/profile/561993937920" target="_blank" class="fff-metabox-account-text">
							FS Poster
						</a>
						<div class="fff-metabox-account-subtext">
							<i class="far fa-paper-plane"></i>&nbsp;Ok <i class="fa fa-chevron-right "></i> account
						</div>
					</div>
				</div><div class="fff-metabox-account fff-is-sub" data-id="ok:group:26">
					<div class="fff-metabox-account-image">
						<img src="https://i.mycdn.me/image?id=951375231488&amp;t=32&amp;plc=API&amp;aid=1273143296&amp;tkn=*ksxPJMFDdUPmbsk5WbRm2GDW9RM" onerror="fffoster.no_photo( this );">
					</div>
					<div class="fff-metabox-account-label">
						<a href="https://ok.ru/group/56800237191168" target="_blank" class="fff-metabox-account-text">
							FS Poster
						</a>
						<div class="fff-metabox-account-subtext">
							<i class="far fa-paper-plane"></i>&nbsp;Ok <i class="fa fa-chevron-right "></i> group
						</div>
					</div>
				</div><div class="fff-metabox-account fff-is-disabled" data-id="telegram:account:12">
					<div class="fff-metabox-account-image">
						<img src="https://demo.fs-poster.com/wp-content/plugins/fs-poster/App/Pages/Base/Assets/img/telegram.svg" onerror="fffoster.no_photo( this );">
					</div>
					<div class="fff-metabox-account-label">
						<a href="https://t.me/fffosterTestBot" target="_blank" class="fff-metabox-account-text">
							fffostertest
						</a>
						<div class="fff-metabox-account-subtext">
							<i class="far fa-paper-plane"></i>&nbsp;Telegram <i class="fa fa-chevron-right "></i> account
						</div>
					</div>
				</div><div class="fff-metabox-account fff-is-sub" data-id="telegram:chat:31">
					<div class="fff-metabox-account-image">
						<img src="https://demo.fs-poster.com/wp-content/plugins/fs-poster/App/Pages/Base/Assets/img/telegram.svg" onerror="fffoster.no_photo( this );">
					</div>
					<div class="fff-metabox-account-label">
						<a href="http://t.me/testchannelfffoster" target="_blank" class="fff-metabox-account-text">
							FS Poster
						</a>
						<div class="fff-metabox-account-subtext">
							<i class="far fa-paper-plane"></i>&nbsp;Telegram <i class="fa fa-chevron-right "></i> chat
						</div>
					</div>
				</div>		</div>
				</div>
            `,
			showCloseButton: true,
			focusConfirm: false,
			confirmButtonText: 'Đóng',
			confirmButtonAriaLabel: '',
			onOpen: () => {} //on open
		})
	})

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
		getListPost();
	}

	function getListPost() {
		var urlAPI = '//b.fffblue.com/huy/index.php?task=getPostByUser&page=1';
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
		
		let data = obj.data.posts;
		let html = '';
		data.forEach(ele => {
			html += `<div class="fff-share-post" data-id="20">
					<div class="fff-share-post-id"></div>
					<div class="fff-share-post-title">
						<a href="${ele.original_url}">{${ele.title}}</a>
					</div>
					<div class="fff-share-post-date">${ele.created_date}</div>
					<div class="fff-share-post-controls btn">
						<i class="fas fa-rocket fffSharePostBtn" data-postid="${ele.id}" data-type="${data_tab}"></i>
						<i class="fas fa-trash fff-tooltip fff-icon-button delete_post_btn" data-postid="${ele.id}" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
					</div>
				</div>
				`;
		});

		$('.fff-title-count').html(data.length);

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
			var urlAPI = '//b.fffblue.com/huy/index.php?task=sharePostById';
			var header = {
				'Authorization': `Bearer ${ACCESS_TOKEN}`
			}
			let postVal = {
				post_id: postId
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
			callAPI(urlAPI, 'post', postVal, header, shareComplete );
		
		}).on('mouseenter', function () {
			$(this).html('<div class="fffSharePostBtn-tooltip">Chia sẻ</div>')
		}).on('mouseleave', function () {
			$(this).html('')
		});

	}

	function deleteComplete(obj) {
		getListPost();
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

		}

		$('.fff-metabox-tab').on('click', function () {
			let tab_type = $(this).data('tab')
			data_tab = tab_type
			$('.fff-metabox-tab').removeClass('fff-is-active');
			$(this).addClass('fff-is-active');
			$('.shareNowBtn').attr('data-type', tab_type);
			$('.fff-metabox-accounts-empty').attr('data-type', tab_type);
			$('.fff-add-schedule').attr('data-type', tab_type);
			$('.fffSharePostBtn').attr('data-type', tab_type);

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

		$('.fff-metabox-accounts-empty').on('click', function(){
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
				   let data = $('.fff-metabox-accounts-empty').attr('data-type');                    
				   
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

   callBackApi = function (obj) {
		getListSocialAccount();
		win.close();
		Swal.close();
	}

});