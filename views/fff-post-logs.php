<div class="wrap">
	<div class="fff-container">

	<div class="fff-header-banner"></div>

		<div class="fff-header">
            <div class="fff-nav">
			<a class="fff-nav-link"
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-account'); ?>">Tài Khoản</a>
                <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-schedule'); ?>">Lịch Trình</a>
                <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-share'); ?>">Chia Sẻ</a>
                <!-- <a class="fff-nav-link "
                    href="<?php echo esc_html (FFF_AUTO_POST_PLUGIN_SETTING_PATH.'&action=fff-post-index'); ?>">Báo Cáo</a> -->
                <a class="fff-nav-link active"
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
						Nhật ký <span class="fff-title-count">12</span>
					</div>
					<!-- <div class="fff-title-button">
						<div class="fff-title-selector">
							<label>Count of rows</label>
							<select id="fffRowsSelector" class="fff-form-select">
								<option selected="">4</option>
								<option>8</option>
								<option>15</option>
							</select>
						</div>

						<button id="fffClearLogs" class="fff-button fff-is-danger">
							<i class="far fa-trash-alt"></i><span class="fff-show">CLEAR LOGS</span>
						</button>
					</div> -->
				</div>

				<!--end title -->

				<!--logs-->
				<div id="fffLogs" class="col-12">
					<!-- <div class="fff-log">
						<div class="fff-log-image">
							<img src="https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/5_2zSM9mMSk.png"
								onerror="fffoster.no_photo( this );">
						</div>
						<div class="fff-log-title">
							<div class="fff-log-title-text">
								FS Poster
								<a target="_blank" href="https://fb.com/582784935666114" class="fff-tooltip"
									data-title="Profile link">
									<i class="fas fa-external-link-alt"></i>
								</a>
							</div>
							<div class="fff-log-title-subtext">
								2020-09-08 22:59:23
							</div>
						</div>
						<div class="fff-log-title fff-is-second">
							<div class="fff-log-title-link">
								<a target="_blank" href="https://fb.com/620587488552525">
									<i class="fas fa-external-link-alt"></i>
									Đường dẫn đến bài đăng
								</a>
							</div>
							<div class="fff-log-title-subtext fff-log-title-sublink">
								<i class="fab fa-facebook"></i> Facebook
							</div>
						</div>
						<div class="fff-log-status-container">
							<div class="fff-status fff-is-success"><i class="fas fa-check"></i>Thành công</div>
						</div>
						<div class="fff-log-stats">
							<div class="fff-log-stat">
								<i class="far fa-eye"></i> Hits: <span class="fff-log-stat-value">0</span>
							</div>
							<div class="fff-log-stat">
								<i class="far fa-comments"></i> Comments: <span class="fff-log-stat-value">0</span>
							</div>
							<div class="fff-log-stat">
								<i class="far fa-thumbs-up"></i> Likes: <span class="fff-log-stat-value">0</span>
							</div>
							<div class="fff-log-stat">
								<i class="fas fa-share-alt"></i> Shares: <span class="fff-log-stat-value">0</span>
							</div>
						</div>
					</div> -->

				</div>
				<!--end logs -->

				<!-- pagination -->
				<!-- <div id="fffLogsPages" class="col-12 fff-logs-pagination"><button
						class="fff-button fff-is-danger fff-logs-page" data-page="1">1</button><button
						class="fff-button fff-is-white fff-logs-page" data-page="2">2</button><button
						class="fff-button fff-is-white fff-logs-page" data-page="3">3</button><button
						class="fff-button fff-is-white fff-logs-page" data-page="4">4</button><button
						class="fff-button fff-is-white" disabled="">...</button><button
						class="fff-button fff-is-white fff-logs-page" data-page="52">52</button><select
						id="fffLogsPageSelector" class="fff-form-select">
						<option value="1" selected="">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
						<option value="13">13</option>
						<option value="14">14</option>
						<option value="15">15</option>
						<option value="16">16</option>
						<option value="17">17</option>
						<option value="18">18</option>
						<option value="19">19</option>
						<option value="20">20</option>
						<option value="21">21</option>
						<option value="22">22</option>
						<option value="23">23</option>
						<option value="24">24</option>
						<option value="25">25</option>
						<option value="26">26</option>
						<option value="27">27</option>
						<option value="28">28</option>
						<option value="29">29</option>
						<option value="30">30</option>
						<option value="31">31</option>
						<option value="32">32</option>
						<option value="33">33</option>
						<option value="34">34</option>
						<option value="35">35</option>
						<option value="36">36</option>
						<option value="37">37</option>
						<option value="38">38</option>
						<option value="39">39</option>
						<option value="40">40</option>
						<option value="41">41</option>
						<option value="42">42</option>
						<option value="43">43</option>
						<option value="44">44</option>
						<option value="45">45</option>
						<option value="46">46</option>
						<option value="47">47</option>
						<option value="48">48</option>
						<option value="49">49</option>
						<option value="50">50</option>
						<option value="51">51</option>
						<option value="52">52</option>
					</select></div> -->
				<!--end pagination -->

			</div>
			<!--row-->

		</div> <!-- body -->



	</div>
</div>

<?php
   wp_enqueue_script( 'fff-auto-post-logs', FFF_AUTO_POST_PLUGIN_URL.'assets/js/fff-auto-post-logs.js', array(), true,true );
?>