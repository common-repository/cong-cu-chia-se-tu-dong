jQuery(document).ready(function( $ ) {

    //air date picker
    $('.datepicker-here').datepicker();
    $('.datepicker-here').data('datepicker');

    //popup calendar
    $('.fff-add-schedule').on('click', function () {
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
                footer: 'fff-modal-subfooter schedule_popup',
            },
            width: 570, 
            position: 'center-end',
            icon: '',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Lưu lại',
            confirmButtonAriaLabel: '',
            cancelButtonText: 'Đóng',
            cancelButtonAriaLabel: '',
            footer: 'Posts matching your filters&nbsp;<span class="schedule_matches_count">4</span>',
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
                <div class="fff-modal-title-text">Add a new schedule</div>
            </div>
            `,
            html: `
            <div class="fff-modal-tabs">
            <div class="fff-modal-tab fff-is-active" data-step="1">
            <span>1</span>Basic data    </div>
            <div class="fff-modal-tab" data-step="2">
                <span>2</span>Filters   </div>
            <div class="fff-modal-tab" data-step="3">
                <span>3</span>Accounts  </div>
            <div class="fff-modal-tab" data-step="4">
                <span>4</span>Custom messages   </div>
            </div>

            <!-- modal step-1 -->
            <div id="fffModalStep_1" class="fff-modal-step">
                <div class="fff-form-group">
                    <label>Name&emsp;<i class="far fa-question-circle fff-tooltip" data-title="Add a name for your schedule to recognize it in your schedule list"></i></label>
                    <input autocomplete="off" class="fff-form-input schedule_input_title" value="" placeholder="Enter a name">
                </div>

                <div class="fff-form-group">
				<label>Start date &amp; time&emsp;<i class="far fa-question-circle fff-tooltip" data-title="When the schedule will start"></i></label>
                    <div class="fff-modal-row">
                        <div class="fff-modal-col">
                            <input type="text" autocomplete="off" class="fff-form-input schedule_input_start_date hasDatepicker" placeholder="Select date" value="2020-09-10" data-language='en' id="">
                            <input type="time" autocomplete="off" class="fff-form-input schedule_input_start_time" placeholder="Select time" value="08:58">
                        </div>
                        <div class="fff-modal-col">
                            Local time: 2020-09-10 08:58 </div>
                    </div>
                </div>
                
                <div id="fffScheduleHowShareRow" class="fff-form-group ">
                    <label>How you want to share&emsp;<i class="far fa-question-circle fff-tooltip" data-title="Define to share a single post repeatedly or once"></i></label>
                    <select class="fff-form-select post_freq">
                        <option value="once" selected="">Share once</option>
                        <option value="repeat">Share repeatedly</option>
                    </select>
                </div>

                <div class="fff-form-group">
                    <div class="fff-form-checkbox-group">
                        <input id="fffScheduleSetSleepTime" type="checkbox" class="fff-form-checkbox schedule_set_sleep_time">
                        <label for="fffScheduleSetSleepTime">
                            Set a sleep timer					</label>
                        <span class="fff-tooltip" data-title="You can set a sleep timer in your schedule. The plugin won't share any post during the sleep time."><i class="far fa-question-circle"></i></span>
                    </div>
                    <div id="fffScheduleSetSleepTimeContainer" class="fff-modal-row ">
                        <div class="fff-modal-col">
                            <input type="time" autocomplete="off" class="fff-form-input schedule_input_sleep_time_start" value="">
                            <input type="time" autocomplete="off" class="fff-form-input schedule_input_sleep_time_end" value="">
                        </div>
                        <div class="fff-modal-col"></div>
                    </div>
                </div>
                
                <div id="fffScheduleOutOfStockRow" class="fff-form-checkbox-group">
                    <input id="fffScheduleOutOfStock" type="checkbox" class="fff-form-checkbox schedule_dont_post_out_of_stock_products">
                    <label for="fffScheduleOutOfStock">
                        Don't post products that are out of stock	</label>
                </div>

            </div> <!-- end modal step-1 -->

            <!-- modal step-2 -->
            <div id="fffModalStep_2" class="fff-modal-step fff-hide">

                <div class="fff-form-group ">
                    <label>By the published time of the posts&emsp;<i class="far fa-question-circle fff-tooltip" data-title="Select posts that are published in a specific time."></i></label>
                    <select class="fff-form-select schedule_input_post_date_filter">
                        <option value="all">All times</option>
                        <option value="this_week">This week</option>
                        <option value="previously_week">Previous week</option>
                        <option value="this_month">This month</option>
                        <option value="previously_month">Previous month</option>
                        <option value="this_year">This year</option>
                        <option value="last_30_days">Last 30 days</option>
                        <option value="last_60_days">Last 60 days</option>
                    </select>
                </div>

                <div class="fff-form-group ">
                    <label>By post type&emsp;<i class="far fa-question-circle fff-tooltip" data-title="You can select new post types in [ FS Poster > Settings > Share post types ]."></i></label>
                    <select class="fff-form-select schedule_input_post_type_filter">
                        <option value="post">Post</option><option value="attachment">Attachment</option></select>
                </div>

                <div class="fff-form-group ">
                    <label>By the post category and tag</label>
                    <select class="fff-form-select schedule_input_category_filter">
                        <option>- All -</option>
                        <optgroup label="Post categories">
                            <option value="1">Uncategorized</option></optgroup>
                        <optgroup label="Custom categories"></optgroup>	</select>
                </div>

                <div class="fff-form-group">
                    <label>Specific Post ID(s) (separate by comma)</label>
                    <input autocomplete="off" class="fff-form-input schedule_input_post_ids" value="">
                </div>

            </div> <!-- end modal step-2 -->

            <!-- modal step-3 -->
            <div id="fffModalStep_3" class="fff-modal-step fff-hide" style="display: block;">
                <div class="fff-metabox fff-is-mini">
                    <div class="fff-card-body">
                        <input type="hidden" name="share_checked" value="on">
                        <div id="fffMetaboxShareContainer">
                            <div class="fff-metabox-tabs">
                                <div data-tab="all" class="fff-metabox-tab fff-is-active">all</div>
                                <div data-tab="fb" class="fff-metabox-tab"><i class="fab fa-facebook"></i></div>
                                <div data-tab="twitter" class="fff-metabox-tab"><i class="fab fa-twitter"></i></div>
                                <div data-tab="instagram" class="fff-metabox-tab"><i class="fab fa-instagram"></i></div>
                                <div data-tab="linkedin" class="fff-metabox-tab"><i class="fab fa-linkedin"></i></div>
                                <div data-tab="vk" class="fff-metabox-tab"><i class="fab fa-vk"></i></div>
                                <div data-tab="pinterest" class="fff-metabox-tab"><i class="fab fa-pinterest"></i></div>
                                <div data-tab="reddit" class="fff-metabox-tab"><i class="fab fa-reddit"></i></div>
                                <div data-tab="tumblr" class="fff-metabox-tab"><i class="fab fa-tumblr"></i></div>
                                <div data-tab="ok" class="fff-metabox-tab"><i class="fab fa-odnoklassniki"></i></div>
                                <div data-tab="google_b" class="fff-metabox-tab"><i class="fab fa-google"></i></div>
                                <div data-tab="telegram" class="fff-metabox-tab"><i class="fab fa-telegram"></i></div>
                                <div data-tab="medium" class="fff-metabox-tab"><i class="fab fa-medium"></i></div>
                                <div data-tab="wordpress" class="fff-metabox-tab"><i class="fab fa-wordpress"></i></div>
                            </div>
                            <div class="fff-metabox-accounts">
                                <div class="fff-metabox-accounts-empty">
                                    Please select an account.	</div>
                                
                                    <div data-driver="vk" class="fff-metabox-account" style="display: flex;">
                                        <input type="hidden" name="" value="">
                                        <div class="fff-metabox-account-image">
                                            <img src="https://sun1-27.userapi.com/LU8kG6YIrqhZzIttwhq5CyrtcZCsc1axVgQ6hQ/D8gRK62dFxw.jpg?ava=1" onerror="fffoster.no_photo( this );">
                                        </div>
                                        <div class="fff-metabox-account-label">
                                            <a href="https://vk.com/club195725854" class="fff-metabox-account-text">
                                                Fs Poster									</a>
                                            <div class="fff-metabox-account-subtext">
                                                <i class="fab fa-vk"></i>&nbsp;Vk&nbsp;&gt;&nbsp;group&nbsp;									</div>
                                        </div>
                                        <div class="fff-metabox-account-remove">
                                            <i class="fas fa-times"></i>
                                        </div>
                                    </div>
                                                    </div>
                        </div>
                    </div>
                    <div class="fff-card-footer fff-is-right">
                        <button type="button" class="fff-button fff-is-gray fff-metabox-add">ADD</button>
                        <button type="button" class="fff-button fff-is-red fff-metabox-clear">CLEAR</button>
                    </div>
                </div>
            </div> <!-- end modal step-3 -->

            <!-- modal step-4 -->
            <div id="fffModalStep_4" class="fff-modal-step" style="display: block;">
            <div class="fff-custom-messages-container">
                <div class="fff-card-body">
                    <div class="fff-custom-messages-tabs">
                        <div data-tab="fb" class="fff-custom-messages-tab fff-is-active"><i class="fab fa-facebook"></i></div>
                        <div data-tab="twitter" class="fff-custom-messages-tab"><i class="fab fa-twitter"></i></div>
                        <div data-tab="instagram" class="fff-custom-messages-tab"><i class="fab fa-instagram"></i></div>
                        <div data-tab="linkedin" class="fff-custom-messages-tab"><i class="fab fa-linkedin"></i></div>
                        <div data-tab="vk" class="fff-custom-messages-tab"><i class="fab fa-vk"></i></div>
                        <div data-tab="pinterest" class="fff-custom-messages-tab"><i class="fab fa-pinterest"></i></div>
                        <div data-tab="reddit" class="fff-custom-messages-tab"><i class="fab fa-reddit"></i></div>
                        <div data-tab="tumblr" class="fff-custom-messages-tab"><i class="fab fa-tumblr"></i></div>
                        <div data-tab="ok" class="fff-custom-messages-tab"><i class="fab fa-odnoklassniki"></i></div>
                        <div data-tab="google_b" class="fff-custom-messages-tab"><i class="fab fa-google"></i></div>
                        <div data-tab="telegram" class="fff-custom-messages-tab"><i class="fab fa-telegram"></i></div>
                        <div data-tab="medium" class="fff-custom-messages-tab"><i class="fab fa-medium"></i></div>
                        <div data-tab="wordpress" class="fff-custom-messages-tab"><i class="fab fa-wordpress"></i></div>
                    </div>
                    <div id="fffCustomMessages" class="fff-custom-messages">
                        <div data-driver="fb" style="">
                            <div class="fff-custom-post">
                                <textarea data-sn-id="fb" name="fs_post_text_message_fb" class="fff-form-textarea" rows="3" maxlength="2000">{title}</textarea>
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
                                        CLEAR								</button>
                                    </div>
                                </div>
                            </div>         
                        
                            </div>
                        </div>
                    </div>
                </div><!-- end modal step-4 -->


           
            `,
            onOpen: () => {

                $('.fff-modal-tab').on('click', function () {
                    var step = $(this).data('step');
                    $('.fff-modal-tab').removeClass('fff-is-active');
                    $(this).addClass('fff-is-active');
                    // console.log('step ', typeof(step))
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

                $('input.hasDatepicker').datepicker({
                    classes:'fff-modal-datepicker'
                })

            } //on open

        })//swalfire

    }) // add schedule button
    
});