<div class="wrap">
    <div class="fff-container">

    <div class="fff-header-banner"></div>

        <div class="fff-header">
            <div class="fff-nav">
            <a class="fff-nav-link"
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-account'); ?>">Tài Khoản</a>
                <a class="fff-nav-link active"
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-schedule'); ?>">Lịch Trình</a>
                <a class="fff-nav-link "
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
                        Lịch trình <span class="fff-title-count">0</span>
                    </div>
                    <div class="fff-title-button">
                        <!-- <a href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-calendar'); ?>"
                            class="fff-button fff-is-info">
                            <i class="fas fa-calendar-alt"></i><span>CALENDAR</span>
                        </a> -->
                        <button class="fff-button fff-add-schedule">
                            <i class="fas fa-plus"></i>
                            <span>Lịch trình</span>
                        </button>
                    </div>
                </div>

                <!--end title -->

                <div class="col-12 fff-schedules">

                    <!-- <div data-id="1" class="fff-schedule">
                        <div class="fff-schedule-checkbox-container">
                            <input data-id="1" type="checkbox" class="fff-form-checkbox fff-schedule-checkbox">
                        </div>
                        <div class="fff-schedule-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <div class="fff-schedule-title">
                            <div class="fff-schedule-title-text">
                                Example Schedule </div>
                            <div class="fff-schedule-title-subtext">
                                Loại bài: <u>Post</u> </div>
                        </div>
                        <div class="fff-schedule-dates">
                            <div class="fff-schedule-dates-row">
                                <div class="fff-schedule-dates-label">
                                    Ngày bắt đầu </div>
                                <div class="fff-schedule-dates-date">
                                    <i class="fas fa-calendar-alt"></i> 2020-08-28 02:59 </div>
                            </div>
                            <div class="fff-schedule-dates-row">
                                <div class="fff-schedule-dates-label">
                                    Bài tiếp theo </div>
                                <div class="fff-schedule-dates-date">
                                    <i class="fas fa-calendar-alt"></i> - </div>
                            </div>
                        </div>
                        <div class="fff-schedule-interval">
                            <i class="fas fa-sync-alt"></i> 1 ngày </div>
                        <div class="fff-schedule-status-container">
                            <span class="fff-status fff-is-warning">
                                dừng </span>
                            <button type="button" class="fff-button fff-is-info fff-tooltip fff-change-schedule"
                                data-id="1" data-title="Resume shares">
                                <i class="fa fa-play"></i></button>
                        </div>
                        <div class="fff-schedule-controls">
                            <div class="fff-schedule-control" data-title="Logs" data-load-modal="posts_list"
                                data-parameter-schedule_id="1" data-fullscreen="true">
                                <i class="fas fa-list-alt"></i>
                                <span class="fff-schedule-control-text">20</span>
                            </div>
                            <div class="fff-schedule-control" data-load-modal="edit_schedule"
                                data-parameter-schedule_id="1">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                            <div data-id="1" class="fff-schedule-control fff-delete-schedule">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    </div> -->

                </div>


            </div>
            <!--row-->

        </div> <!-- body -->



    </div>
</div>

<?php
// wp_enqueue_script( 'fff-auto-post-add-schedule', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fff-auto-post-add-schedule.js', array(), true,true );
wp_enqueue_script( 'fff-auto-post-schedule', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fff-auto-post-schedule.js', array(), true,true );
?>