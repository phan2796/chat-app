const socket = io();

function scrollToBottom() {
  const messages = jQuery("#messages");
  const newMessage = messages.children('li:last-child');

  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');

  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }

}
socket.on('connect', () => {
  console.log('Connected to server');
  var params = params_unserialize(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no err');
    }
  })
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
  console.log('User list', users)
  let ol = jQuery('<ol></ol>');

  users.forEach(user => {
    ol.append(jQuery('<li></li>').text(user))
  });

  jQuery('#users').html(ol);
})
socket.on('newMessage', (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const tpl = jQuery('#message-tpl').html();
  const html = Mustache.render(tpl, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  })
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const tpl = jQuery('#location-tpl').html();
  const html = Mustache.render(tpl, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime,
  })
  jQuery('#messages').append(html)
  scrollToBottom();
  // const li = jQuery('<li></li>');
  // const a = jQuery('<a target="_blank">My current location</a>');

  // li.text(`${formattedTime} --- ${message.from}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();

  const messageTextbox = jQuery('[name=message]');
  if (messageTextbox.val()) {
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    }, function () {
      messageTextbox.val('')
    });
  }
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});

function params_unserialize(p) {
  var ret = {},
    seg = p.replace(/^\?/, '').split('&'),
    len = seg.length, i = 0, s;
  for (; i < len; i++) {
    if (!seg[i]) { continue; }
    s = seg[i].split('=');
    ret[s[0]] = s[1];
  }
  return ret;
}