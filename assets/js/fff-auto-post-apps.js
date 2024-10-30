jQuery(document).ready(function ($) {


    $('.fff-tab').on('click', function () {
        $('.fff-tab').removeClass('fff-is-active')
        $(this).addClass('fff-is-active')
        var data = $(this).data('component');

    })


    $('.fff-apps-add-button').on('click', function () {

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
                    <i class="fas fa-plus"></i>
                </div>
                <div class="fff-modal-title-text">Add a new App</div>
            </div>
            `,
            icon: '',
            html: `
            <p class="fff-modal-p">
            Type&nbsp;<b>app_id</b> and <b>app_key</b>
            </p>
            <div class="fff-modal-step">
                <input type="hidden" id="fffAppDriver" value="fb">
                <div class="fff-form-group ">
                    <label>The App ID</label>
                    <input id="fffAppID" autocomplete="off" class="fff-form-input" placeholder="The App ID">
                </div>
                <div class="fff-form-group ">
                    <label>The App Key</label>
                    <input id="fffAppKey" autocomplete="off" class="fff-form-input" placeholder="The App Key">
                </div>
                <div class="fff-form-group fff-hide">
                    <label>The App Secret</label>
                    <input id="fffAppSecret" autocomplete="off" class="fff-form-input" placeholder="The App Secret">
                </div>
                <div class="fff-form-group ">
                    <label>The App Version</label>
                    <select id="fffAppVersion" class="fff-form-select">
                        <option value="0" disabled=""></option>
                        <option value="80" selected="">v8.0</option>
                        <option value="70">v7.0</option>
                        <option value="60">v6.0</option>
                        <option value="50">v5.0</option>
                        <option value="40">v4.0</option>
                        <option value="33">v3.3</option>
                        <option value="32">v3.2</option>
                        <option value="31">v3.1</option>
                    </select>
                </div>
            </div>
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Thêm Apps',
            confirmButtonAriaLabel: '',
            cancelButtonText: 'Đóng',
            cancelButtonAriaLabel: '',
            onOpen: () => {

                
            } //on open
        })

    })



});