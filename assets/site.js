/* The contact form was an Elementor form that posted to WordPress'
   admin-ajax.php. On a static site that endpoint is gone, so pressing "გაგზავნა"
   silently did nothing and the message was lost.

   Until a real form backend is wired up, the form composes a mail draft in the
   visitor's own mail client instead.

   Elementor Pro's own form handler is still on the page, so this listens on
   document in the capture phase — that runs before any listener bound to the
   form itself — and stops the event there. */
(function () {
  'use strict';

  var MAILTO = document.documentElement.getAttribute('data-contact-email') ||
               'info@imuncentri.ge';

  function value(form, name) {
    var el = form.querySelector('[name="form_fields[' + name + ']"]');
    return el ? el.value.trim() : '';
  }

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form || !form.classList || !form.classList.contains('elementor-form')) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (typeof form.reportValidity === 'function' && !form.reportValidity()) {
      return;
    }

    var name = value(form, 'name');
    var email = value(form, 'email');
    var phone = value(form, 'field_47b6d3f');
    var message = value(form, 'message');

    var body = [
      'სახელი: ' + name,
      'ელ-ფოსტა: ' + email,
      'ტელეფონი: ' + phone,
      '',
      message
    ].join('\r\n');

    var href = 'mailto:' + MAILTO +
      '?subject=' + encodeURIComponent('შეტყობინება საიტიდან — ' + (name || 'ვებგვერდი')) +
      '&body=' + encodeURIComponent(body);

    window.location.href = href;
  }, true);
})();
