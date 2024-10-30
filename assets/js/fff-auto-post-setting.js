jQuery(document).ready(function ($) {
    $('.js-example-basic-multiple').select2({
        width: '222px'
    });

    $('.fff-tab').on('click', function () {
        $('.fff-tab').removeClass('fff-is-active')
        $(this).addClass('fff-is-active')
        var data = $(this).data('component');
        $('#fffComponent').html(buildHtml(data))
        $('.js-example-basic-multiple').select2({
            width: '222px'
        });

        //
        $('.fff-settings-collapser').on('click', function () {
            $(this).parent().find('.fff-settings-collapse').toggle('slow');

            if ($(this).find('.fff-settings-collapse-state').hasClass('fff-is-rotated')) {
                $(this).find('.fff-settings-collapse-state').removeClass('fff-is-rotated')
            } else {
                $(this).find('.fff-settings-collapse-state').addClass('fff-is-rotated');
            }
        })
        
    })



    function buildHtml(ele) {
        var html = '';
        switch (ele) {
            case 'general':
                html = `<form id="fffSettingsForm" class="fff-card fff-settings">

                 <div class="fff-settings-row">
                     <div class="fff-settings-col">
                         <div class="fff-settings-label-text">Show FS Poster column on the posts table</div>
                         <div class="fff-settings-label-subtext">If you don't want to show FS Poster <i
                                 class="far fa-question-circle fff-tooltip" data-title="Click to learn more"
                                 data-open-img=""></i>
                             column on posts table, you can disable this option.</div>
                     </div>
                     <div class="fff-settings-col">
                         <div class="fff-toggle">
                             <input type="checkbox" name="fs_show_fs_poster_column"
                                 class="fff-toggle-checkbox" id="fs_show_fs_poster_column" checked="">
                             <label class="fff-toggle-label" for="fs_show_fs_poster_column"></label>
                         </div>
                     </div>
                 </div>

                 <!-- select -->
                 <div class="fff-settings-row">
                     <div class="fff-settings-col">
                         <div class="fff-settings-label-text">Custom post types</div>
                         <div class="fff-settings-label-subtext">Add post types that you want to share.</div>
                     </div>
                     <div class="fff-settings-col">
                         <select class="fff-form-input js-example-basic-multiple" name="" multiple="multiple">
                             <option value="AL">Alabama</option>
                             <option value="WY">NewYork</option>
                             <option value="WY">Wyoming</option>
                         </select>
                     </div>
                 </div>
                 <!-- end select -->

                 <div class="fff-settings-row">
                     <div class="fff-settings-col">
                         <div class="fff-settings-label-text">Cron Job settings</div>
                         <div class="fff-settings-label-subtext">You can follow this <a
                                 href=""
                                 target="_blank">documentation</a> and configure your WordPress Cron Jobs.
                         </div>
                     </div>
                     <div class="fff-settings-col">
                         2020-09-08 06:37 ( 1 minute(s) ago ) </div>
                 </div>

                 <div class="fff-settings-row">
                     <div class="fff-note col-12">
                         The Cron Job command for your website is: <div class="fff-note-text">wget -O
                             /dev/null https://demo.fs-poster.com/wp-cron.php?doing_wp_cron &gt; /dev/null
                             2&gt;&amp;1</div>
                     </div>
                 </div>

             </form>`;
                break;
            case 'publish':
                html = `<form id="fffSettingsForm" class="fff-card fff-settings">

                 <div class="fff-settings-row">
                     <div class="fff-settings-col">
                         <div class="fff-settings-label-text">Show FS Poster column on the posts table</div>
                         <div class="fff-settings-label-subtext">If you don't want to show FS Poster <i
                                 class="far fa-question-circle fff-tooltip" data-title="Click to learn more"
                                 data-open-img=""></i>
                             column on posts table, you can disable this option.</div>
                     </div>
                     <div class="fff-settings-col">
                         <div class="fff-toggle">
                             <input type="checkbox" name="fs_show_fs_poster_column"
                                 class="fff-toggle-checkbox" id="fs_show_fs_poster_column" checked="">
                             <label class="fff-toggle-label" for="fs_show_fs_poster_column"></label>
                         </div>
                     </div>
                 </div>


                 <div class="fff-settings-row">
                     <div class="fff-settings-col">
                         <div class="fff-settings-label-text">Cron Job settings</div>
                         <div class="fff-settings-label-subtext">You can follow this <a
                                 href=""
                                 target="_blank">documentation</a> and configure your WordPress Cron Jobs.
                         </div>
                     </div>
                     <div class="fff-settings-col">
                         2020-09-08 06:37 ( 1 minute(s) ago ) </div>
                 </div>
             </form>
                 `;
                break;
            case 'url':
                html = `
                 `;
                break;
            case 'wordpress':
                html = `
                
                            <form id="fffSettingsForm" class="fff-card fff-settings">
                                
                <div class="fff-settings-row">
                    <div class="fff-settings-col">
                        <div class="fff-settings-label-text">Post status</div>
                        <div class="fff-settings-label-subtext">Define the post status on the remote website.</div>
                    </div>
                    <div class="fff-settings-col">
                        <select name="fs_wordpress_post_status" id="fs_wordpress_post_status" class="fff-form-select">
                            <option value="publish" selected="">Publish</option>
                            <option value="private">Private</option>
                            <option value="draft">Draft</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>
                <div class="fff-settings-row">
                    <div class="fff-settings-col">
                        <div class="fff-settings-label-text">The post type availability</div>
                        <div class="fff-settings-label-subtext">The post type will be shared as it is on the remote website. In the case, the post type is not available on the remote website, if the option is enabled, the post type will be "Post". If the option is disabled, the post will fail.</div>
                    </div>
                    <div class="fff-settings-col">
                        <div class="fff-toggle">
                            <input type="checkbox" name="fs_wordpress_posting_type" class="fff-toggle-checkbox" id="fs_wordpress_posting_type" checked="">
                            <label class="fff-toggle-label" for="fs_wordpress_posting_type"></label>
                        </div>
                    </div>
                </div>
                <div class="fff-settings-row">
                    <div class="fff-settings-col">
                        <div class="fff-settings-label-text">Post with Categories</div>
                        <div class="fff-settings-label-subtext">Enable to include the categories to the target blog post.</div>
                    </div>
                    <div class="fff-settings-col">
                        <div class="fff-toggle">
                            <input type="checkbox" name="fs_wordpress_post_with_categories" class="fff-toggle-checkbox" id="fs_wordpress_post_with_categories" checked="">
                            <label class="fff-toggle-label" for="fs_wordpress_post_with_categories"></label>
                        </div>
                    </div>
                </div>
                <div class="fff-settings-row">
                    <div class="fff-settings-col">
                        <div class="fff-settings-label-text">Post with Tags</div>
                        <div class="fff-settings-label-subtext">Enable to include the tags to the target blog post.</div>
                    </div>
                    <div class="fff-settings-col">
                        <div class="fff-toggle">
                            <input type="checkbox" name="fs_wordpress_post_with_tags" class="fff-toggle-checkbox" id="fs_wordpress_post_with_tags" checked="">
                            <label class="fff-toggle-label" for="fs_wordpress_post_with_tags"></label>
                        </div>
                    </div>
                </div>
                <div class="fff-settings-row">
                    <div class="fff-settings-col">
                        <div class="fff-settings-label-text">Post Title</div>
                        <div class="fff-settings-label-subtext">You can customize the title of the post as you like by using the keywords.</div>
                    </div>
                    <div class="fff-settings-col">
                        <input autocomplete="off" class="fff-form-input" name="fs_post_title_wordpress" value="{title}">
                    </div>
                </div>
                <div class="fff-settings-row fff-is-collapser">
                    <div class="fff-settings-collapser">
                        <div class="fff-settings-label-text">Post excerpt	<i class="fas fa-angle-up fff-settings-collapse-state"></i></div>
                        <div class="fff-settings-label-subtext">You can customize the excerpt of the shared post as you like by using the current keywords.</div>
                    </div>
                    <div class="fff-settings-collapse">
                        <div class="fff-settings-col">
                            <div class="fff-settings-col-title">Text</div>
                            <div class="fff-custom-post" data-preview="fffCustomPostPreview1">
                                <textarea name="fs_post_excerpt_wordpress" class="fff-form-textarea">{excerpt}</textarea>
                                <div class="fff-custom-post-buttons">
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{id}">
                                        {ID}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post ID"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{product_regular_price}">
                                        {PRODUCT_REGULAR_PRICE}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="WooCommerce - product price"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{author}">
                                        {AUTHOR}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post author name"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{content_short_40}">
                                        {CONTENT_SHORT_40}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="The default is the first 40 characters. You can set the number whatever you want. The plugin will share that number of characters."></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{title}">
                                        {TITLE}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post title"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{featured_image_url}">
                                        {FEATURED_IMAGE_URL}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Featured image URL"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{tags}">
                                        {TAGS}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post Tags"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{product_sale_price}">
                                        {PRODUCT_SALE_PRICE}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="WooCommerce - product sale price"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{content_full}">
                                        {CONTENT_FULL}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post full content"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{short_link}">
                                        {SHORT_LINK}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post short link"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{excerpt}">
                                        {EXCERPT}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post excerpt"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{categories}">
                                        {CATEGORIES}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post Categories"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{uniq_id}">
                                        {UNIQ_ID}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Unique ID"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{cf_KEY}">
                                        {CF_KEY}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Custom fields. Replace KEY with the custom field name."></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{link}">
                                        {LINK}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post link"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-red fff-clear-button" title="Click to clear the textbox">
                                        CLEAR					</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fff-settings-row fff-is-collapser">
                    <div class="fff-settings-collapser">
                        <div class="fff-settings-label-text">Post content			<i class="fas fa-angle-up fff-settings-collapse-state "></i></div>
                        <div class="fff-settings-label-subtext">You can customize the text of the shared post as you like by using the current keywords.</div>
                    </div>
                    <div class="fff-settings-collapse">
                        <div class="fff-settings-col">
                            <div class="fff-settings-col-title">Text</div>
                            <div class="fff-custom-post" data-preview="fffCustomPostPreview2">
                                <textarea name="fs_post_text_message_wordpress" class="fff-form-textarea">{content_full}</textarea>
                                <div class="fff-custom-post-buttons">
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{id}">
                                        {ID}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post ID"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{product_regular_price}">
                                        {PRODUCT_REGULAR_PRICE}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="WooCommerce - product price"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{author}">
                                        {AUTHOR}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post author name"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{content_short_40}">
                                        {CONTENT_SHORT_40}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="The default is the first 40 characters. You can set the number whatever you want. The plugin will share that number of characters."></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{title}">
                                        {TITLE}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post title"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="<img src=&quot;{featured_image_url}&quot;>">
                                        {FEATURED_IMAGE_URL}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Featured image URL"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{tags}">
                                        {TAGS}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post Tags"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{product_sale_price}">
                                        {PRODUCT_SALE_PRICE}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="WooCommerce - product sale price"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{content_full}">
                                        {CONTENT_FULL}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post full content"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="<a href=&quot;{short_link}&quot;>{short_link}</a>">
                                        {SHORT_LINK}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post short link"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{excerpt}">
                                        {EXCERPT}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post excerpt"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{categories}">
                                        {CATEGORIES}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post Categories"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{uniq_id}">
                                        {UNIQ_ID}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Unique ID"></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="{cf_KEY}">
                                        {CF_KEY}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Custom fields. Replace KEY with the custom field name."></i>
                                    </button>
                                    <button type="button" class="fff-button fff-is-gray fff-append-to-text" data-key="<a href=&quot;{link}&quot;>{link}</a>">
                                        {LINK}
                                        <i class="fas fa-info-circle fff-tooltip" data-title="Post link"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>			</form>
                       
                `;
                break;
            default:
                break;
        }
        return html;
    }
});