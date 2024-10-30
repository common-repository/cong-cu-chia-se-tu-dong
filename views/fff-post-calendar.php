<div class="wrap">
    <div class="fff-container">

        <div class="fff-header-banner"></div>

        <div class="fff-header">
            <div class="fff-nav">
            <a class="fff-nav-link"
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-account'); ?>">Tài Khoản</a>
                <!-- <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-schedule'); ?>">Lịch Trình</a> -->
                <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-share'); ?>">Chia Sẻ</a>
                <!-- <a class="fff-nav-link"
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-custom-message'); ?>">Bài tùy chọn</a> -->
                <!-- <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-index'); ?>">Báo Cáo</a> -->
                <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-logs'); ?>">Nhật Ký</a>
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
                        Calendar
                    </div>
                    <div class="fff-title-button">
                        <a href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-schedule'); ?>"
                            class="fff-button fff-is-gray">
                            <i class="fas fa-chevron-left"></i><span>BACK TO SCHEDULES</span>
                        </a>
                    </div>
                </div>

                <!--end title -->

                <div class="col-12 row">
                    <div class="col-12 col-md-6 fff-calendar-left">
                        <div class="fff-card fff-calendar-card">
                            <div class="fff-card-body">
                                <div class="datepicker-here" data-language='en'></div>
                            </div>
                            <div class="fff-card-footer fff-is-center">
                                <button class="fff-button fff-add-schedule" type="button">
                                    <i class="fas fa-plus"></i><span>SCHEDULE</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6 fff-calendar-right">
                        <div class="fff-card">
                            <div class="fff-card-title">
                                SCHEDULED POSTS
                            </div>
                            <div class="fff-card-body fff-calendar-posts plan_posts_list"></div>
                            <div class="fff-calendar-emptiness">
                                <img
                                    src="<?php echo FFF_AUTO_POST_PLUGIN_URL ;?>assets/images/empty-calendar.svg">
                            </div>
                        </div>
                    </div>

                </div>


            </div>
            <!--row-->


        </div> <!-- body -->



    </div>
</div>

<?php
wp_enqueue_script( 'fff-auto-post-calendar', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fff-auto-post-calendar.js', array(), true,true );
wp_enqueue_script( 'fff-auto-post-add-schedule', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fff-auto-post-add-schedule.js', array(), true,true );
?>