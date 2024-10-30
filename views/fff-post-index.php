<div class="wrap">
    <div class="fff-container">

    <div class="fff-header-banner"></div>

        <div class="fff-header dashboard">
            <div class="fff-nav">
               
            <a class="fff-nav-link"
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-account'); ?>">Tài Khoản</a>
                <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-schedule'); ?>">Lịch Trình</a>
                <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-share'); ?>">Chia Sẻ</a>
                <a class="fff-nav-link  active"
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-index'); ?>">Báo Cáo</a>
                <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-custom-message'); ?>">Bài tùy chọn</a>
                <!-- <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-logs'); ?>">Nhật Ký</a> -->
                <!-- <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-apps'); ?>">Ứng Dụng</a> -->
                <!-- <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-setting'); ?>">Cấu Hình</a> -->
            </div>

        </div>

        <div class="fff-body dashboard">
            <div class="row">

                <div class="col-12">
                    <div class="fff-dashboard-stats">
                        <div class="fff-dashboard-stats-col col-12 col-md-6 col-lg-3">
                            <img class="fff-dashboard-stats-icon"
                                src="<?php echo FFF_AUTO_POST_PLUGIN_URL ;?>assets/images/fsp-icon-share.svg">
                            <div>
                                <span class="fff-dashboard-stats-text">140</span>
                                <span class="fff-dashboard-stats-subtext">Shares in this month</span>
                            </div>
                        </div>
                        <div class="fff-dashboard-stats-col col-12 col-md-6 col-lg-3">
                            <img class="fff-dashboard-stats-icon"
                                src="<?php echo FFF_AUTO_POST_PLUGIN_URL ;?>assets/images/fsp-icon-pointer.svg">
                            <div>
                                <span class="fff-dashboard-stats-text">36</span>
                                <span class="fff-dashboard-stats-subtext">Clicks in this month</span>
                            </div>
                        </div>
                        <div class="fff-dashboard-stats-col col-12 col-md-6 col-lg-3">
                            <img class="fff-dashboard-stats-icon"
                                src="<?php echo FFF_AUTO_POST_PLUGIN_URL ;?>assets/images/fsp-icon-people.svg">
                            <div>
                                <span class="fff-dashboard-stats-text">11</span>
                                <span class="fff-dashboard-stats-subtext">Total accounts</span>
                            </div>
                        </div>
                        <div class="fff-dashboard-stats-col col-12 col-md-6 col-lg-3">
                            <img class="fff-dashboard-stats-icon"
                                src="<?php echo FFF_AUTO_POST_PLUGIN_URL ;?>assets/images/fsp-icon-calendar.svg">
                            <div>
                                <span class="fff-dashboard-stats-text">4</span>
                                <span class="fff-dashboard-stats-subtext">Clicks from schedules</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fff-dashboard-graphs col-12 col-md-6">
                    <div class="fff-card">
                        <div class="fff-card-title">
                            Shared posts count
                        </div>
                        <div class="fff-card-body p-20">
                            <canvas id="myChart" width="200" height="200"></canvas>
                        </div>
                    </div>
                </div>


                <div class="fff-dashboard-graphs col-12 col-md-6">
                    <div class="fff-card">
                        <div class="fff-card-title">
                            Clicks count
                        </div>
                        <div class="fff-card-body p-20">
                            <canvas id="chart-area" width="200" height="200"></canvas>
                        </div>
                    </div>
                </div>


                <div class="fff-dashboard-graphs col-12 col-md-6">
                    <div class="fff-card">
                        <div class="fff-card-title">
                            Social networks comparison (by clicks)
                        </div>
                        <div class="fff-card-body p-20">
                            <canvas id="chart-area1" width="200" height="200"></canvas>
                        </div>
                    </div>
                </div>


                <div class="fff-dashboard-graphs col-12 col-md-6">
                    <div class="fff-card">
                        <div class="fff-card-title">
                            Accounts comparison (by clicks)
                        </div>
                        <div class="fff-card-body p-20">
                            <canvas id="chart-area2" width="200" height="200"></canvas>
                        </div>
                    </div>
                </div>


            </div> <!-- row -->
        </div> <!-- body -->



    </div>
</div>

<?php
wp_enqueue_script( 'fff-auto-post-index', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fff-auto-post-index.js', array(), true,true );
?>