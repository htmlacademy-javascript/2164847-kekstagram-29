import { createState } from './state.js';

const ERROR_TYPE = 'error';
const SUCCESS_TYPE = 'success';
const NOTIFICSTION_CLASS = 'notification';

let primaryKey = 0;
const errorTemplate = document.getElementById('error');
const successTemplate = document.getElementById('success');

const notificationsState = createState({
  stack: []
}, renderNotifications);


function renderNotifications(state = notificationsState) {
  // eslint-disable-next-line no-use-before-define
  const nt = notification;
  document
    .querySelectorAll(`.${NOTIFICSTION_CLASS}`)
    // eslint-disable-next-line no-shadow
    .forEach((notification) => {
      notification.remove();
    });

  for(let i = 0; i < state.stack.length; i++) {
    let element;
    // eslint-disable-next-line no-shadow
    const notification = state.stack[i];

    switch(notification.type) {
      case ERROR_TYPE:
        element = errorTemplate.content.cloneNode(true);
        break;
      case SUCCESS_TYPE:
        element = successTemplate.content.cloneNode(true);
        break;
      default:
        break;
    }

    if(! element) {
      continue;
    }

    element
      .querySelector('section')
      .classList.add(NOTIFICSTION_CLASS);
    element
      .querySelector('section')
      .addEventListener('click', (e) => {
        if(e.target.closest('.error__inner') || e.target.closest('.success__inner')) {
          return;
        }
        nt.remove(notification.id);
      });
    element
      .querySelector('h2')
      .textContent = notification.message;
    element
      .querySelector('button')
      .addEventListener('click', (e) => {
        if(typeof notification?.callback === 'function') {
          notification.callback.apply(notification, [ e ]);
        }
      });

    document.body.appendChild(element);
  }
}


function createNotification({
  type,
  message,
  callback
}) {
  return {
    type,
    message,
    id: primaryKey++,
    callback: callback || (function () {
      // eslint-disable-next-line no-use-before-define
      notification.remove(this.id);
    })
  };
}
function createError(message) {
  return createNotification({
    message,
    type: ERROR_TYPE
  });
}
function createSuccess(message) {
  return createNotification({
    message,
    type: SUCCESS_TYPE
  });
}
export const notification = {
  add: function(notice) {
    notificationsState.update((prev) => ({
      stack: [
        notice,
        ...prev.stack,
      ]
    }));
    return {
      notification: notice,
      remove: () => this.remove(notice.id)
    };
  },
  clear: function() {
    notificationsState.update({
      stack: []
    });
  },
  remove: function(id) {
    notificationsState.update((prev) => ({
      stack: prev.stack.filter((el) => el.id !== id)
    }));
  },
  error: function(message) {
    return this.add(createError(message));
  },
  success: function(message) {
    return this.add(createSuccess(message));
  }
};


document.addEventListener('keydown', (evt) => {
  evt = evt || window.event;
  let isEscape = false;
  if ('key' in evt) {
    isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
  } else {
    isEscape = (evt.keyCode === 27);
  }
  if (isEscape) {
    notification.clear();
  }
});
