<div class="wrap">
    <div class="fff-container">

    <div class="fff-header-banner"></div>

        <div class="fff-header">
            <div class="fff-nav">
            <a class="fff-nav-link"
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-account'); ?>">Tài Khoản</a>
                <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-schedule'); ?>">Lịch Trình</a>
                <a class="fff-nav-link active"
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-share'); ?>">Chia Sẻ</a>
                <!-- <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-index'); ?>">Báo Cáo</a> -->
                <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-logs'); ?>">Nhật Ký</a>
                <!-- <a class="fff-nav-link"
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-custom-message'); ?>">Bài tùy chọn</a> -->
                <!-- <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-apps'); ?>">Ứng Dụng</a> -->
                <!-- <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-setting'); ?>">Cấu Hình</a> -->
            </div>
        </div>
    
        <div class="fff-body ">
            <div class="row">

                <div class="col-12 fff-title">
                    <div class="fff-title-text">
                        Chia Sẻ
                    </div>
                </div>
                <!--end title -->

                <!-- left -->
                <div class="col-12 col-lg-6 fff-share-leftcol">
                    <div class="fff-card">
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
                        <div class="fff-card-footer">
                            <button type="button" class="fff-button shareNowBtn" data-type="all">Chia sẻ</button>
                            <button type="button" class="fff-button fff-is-info fff-add-schedule" data-type="all">Lên lịch</button>
                            <button type="button" class="fff-button fff-is-gray saveBtn">Lưu bài viết</button> 
                        </div>
                    </div>
                </div>
                <!-- end left -->

                <!-- right -->
                <div class="col-12 col-lg-6 fff-share-rightcol">

                    <div class="fff-metabox fff-card h-100">
                        <div class="fff-card-body">
                            <!-- <div class="fff-form-toggle-group">
                                <label>Share</label>
                                <div class="fff-toggle">
                                    <input type="hidden" name="share_checked" value="off">
                                    <input type="checkbox" name="share_checked" class="fff-toggle-checkbox"
                                        id="fffMetaboxShare" checked="">
                                    <label class="fff-toggle-label" for="fffMetaboxShare"></label>
                                </div>
                            </div> -->
                            <div id="fffMetaboxShareContainer" style="">
                                <div class="fff-metabox-tabs">
                                    <div data-tab="all" class="fff-metabox-tab fff-is-active">all</div>
                                    <!-- <div data-tab="facebook" class="fff-metabox-tab"><i class="fab fa-facebook"></i></div> -->
                                    <div data-tab="twitter" class="fff-metabox-tab"><i class="fab fa-twitter"></i></div>
                                    <!-- <div data-tab="instagram" class="fff-metabox-tab"><i class="fab fa-instagram"></i></div> -->
                                    <div data-tab="linkedin" class="fff-metabox-tab"><i class="fab fa-linkedin"></i></div>
                                    <!-- <div data-tab="vk" class="fff-metabox-tab"><i class="fab fa-vk"></i></div> -->
                                    <!-- <div data-tab="pinterest" class="fff-metabox-tab"><i class="fab fa-pinterest"></i></div> -->
                                    <div data-tab="reddit" class="fff-metabox-tab"><i class="fab fa-reddit"></i></div>
                                    <div data-tab="tumblr" class="fff-metabox-tab"><i class="fab fa-tumblr"></i></div>
                                    <!-- <div data-tab="ok" class="fff-metabox-tab"><i class="fab fa-odnoklassniki"></i></div> -->
                                    <div data-tab="blogger" class="fff-metabox-tab"><i class="fab fa-blogger"></i></div>
                                    <!-- <div data-tab="telegram" class="fff-metabox-tab"><i class="fab fa-telegram"></i></div> -->
                                    <div data-tab="medium" class="fff-metabox-tab"><i class="fab fa-medium"></i></div>
                                    <div data-tab="wordpress" class="fff-metabox-tab"><i class="fab fa-wordpress"></i></div>
                                </div>
                                <div class="fff-metabox-accounts">
                                    <div class="fff-metabox-accounts-empty" data-type="wordpress">
                                    <i class="fas fa-plus" 
                                    style="border: 1px solid #e3eaf3;
                                    border-radius: 4px;
                                    padding: 5px;
                                    margin-right: 5px;"></i> Thêm tài khoản của bạn</div>
                                    <!-- 
                                    <div data-driver="fb" class="fff-metabox-account" style="">
                                        <input type="hidden" name="share_on_nodes[]" value="fb:account:17">
                                        <div class="fff-metabox-account-image">
                                            <img src="https://graph.facebook.com/3868989906450107/picture?redirect=1&amp;height=40&amp;width=40&amp;type=normal"
                                                onerror="fffoster.no_photo( this );">
                                        </div>
                                        <div class="fff-metabox-account-label">
                                            <a href="https://fb.com/me" class="fff-metabox-account-text">
                                                Huy Lam Nguyen
                                            </a>
                                            <div class="fff-metabox-account-subtext">
                                                <i class="fab fa-facebook"></i>&nbsp;Fb&nbsp;<i
                                                    class="fas fa-chevron-right"></i>&nbsp;account
                                            </div>
                                        </div>
                                        <div class="fff-metabox-account-remove">
                                            <i class="fas fa-times"></i>
                                        </div>
                                    </div> -->
                                </div>

                                <!-- <div id="fffMetaboxCustomMessages" class="fff-metabox-custom-messages">
                                    <div data-driver="fb" style="">
                                        <div class="fff-metabox-custom-message-label">
                                            <i class="fas fa-chevron-down"></i>&nbsp;Customize Facebook post message
                                        </div>
                                        <textarea class="fff-form-textarea" rows="3" maxlength="2000"
                                            name="fs_post_text_message_fb" style=""></textarea>
                                    </div>
                                </div> -->

                            </div>
                        </div>
                        <!-- <div class="fff-card-footer fff-is-right">
                            <button type="button" class="fff-button fff-is-gray fff-metabox-add">ADD</button>
                            <button type="button" class="fff-button fff-is-red fff-metabox-clear">CLEAR</button>
                        </div> -->
                    </div>


                </div>
                <!-- end right -->

                <div class="col-12 fff-title">
                    <div class="fff-title-text">
                        Bài viết đã lưu<span class="fff-title-count">1</span>
                    </div>
                    <div class="fff-title-button"></div>
                </div>

                <div class="col-12" id="fffListPost">
                    <!-- <div class="fff-share-post" data-id="20">
                        <div class="fff-share-post-id">20 </div>
                        <div class="fff-share-post-title">
                            <a href="?page=fs-poster-share&amp;post_id=20">{Guys! check out my new blog post....}</a>
                        </div>
                        <div class="fff-share-post-date">
                            2020-06-16 10:01 </div>
                        <div class="fff-share-post-controls">
                            <i class="fas fa-trash fff-tooltip fff-icon-button delete_post_btn"
                                data-title="Delete the post"></i>
                        </div>
                    </div>
                    <div class="fff-share-post" data-id="20">
                        <div class="fff-share-post-id">20 </div>
                        <div class="fff-share-post-title">
                            <a href="?page=fs-poster-share&amp;post_id=20">{Guys! check out my new blog post....}</a>
                        </div>
                        <div class="fff-share-post-date">
                            2020-06-16 10:01 </div>
                        <div class="fff-share-post-controls">
                            <i class="fas fa-trash fff-tooltip fff-icon-button delete_post_btn"
                                data-title="Delete the post"></i>
                        </div>
                    </div> -->
                </div>

            </div>
            <!--row-->

        </div> <!-- body -->



    </div>
</div>

<?php
    wp_enqueue_script( 'fff-auto-post-share', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fff-auto-post-share.js', array(), true,true );
    wp_enqueue_script( 'fff-auto-post-add-schedule', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fff-auto-post-add-schedule.js', array(), true,true );
?>