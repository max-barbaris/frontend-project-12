const ru = {
  translation: {
    global: {
      hexletChat: 'Hexlet Chat',
      cancel: 'Отменить',
      submit: 'Отправить',
      delete: 'Удалить',
      channelName: 'Имя канала',
    },
    auth: {
      loginForm: {
        yourNickname: 'Ваш ник',
        password: 'Пароль',
        login: 'Войти',
        dontHaveAccount: 'Нет аккаунта?',
        error: {
          requiredField: 'Обязательное поле',
          invalidUsernameOrPassword: 'Неверные имя пользователя или пароль',
          unknown: 'Неизвестная ошибка',
        },
      },
      signupForm: {
        yourNickname: 'Ваш ник',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        registration: 'Регистрация',
        register: 'Зарегистрироваться',
        error: {
          requiredField: 'Обязательное поле',
          usernameLength: 'От 3 до 20 символов',
          passwordLength: 'От 6 символов',
          passwordsMustMatch: 'Пароли должны совпадать',
          userAlreadyExist: 'Такой пользователь уже существует',
          unknown: 'Неизвестная ошибка',
        },
      },
    },
    channels: {
      channels: 'Каналы',
      addChannel: 'Добавить канал',
      rename: 'Переименовать',
      delete: 'Удалить',
      channelControl: 'Управление каналом',
      addForm: {
        addChannel: 'Добавить канал',
        error: {
          requiredField: 'Обязательное поле',
          min: 'От 3 до 20 символов',
          mustBeUnique: 'Должно быть уникальным',
          removeLeadSpaces: 'Исключите пробелы перед названием',
        },
      },
      deleteForm: {
        deleteChannel: 'Удалить канал',
        areYouSure: 'Уверены?',
      },
      renameForm: {
        renameChannel: 'Переименовать канал',
        error: {
          requiredField: 'Обязательное поле',
          min: 'От 3 до 20 символов',
          mustBeUnique: 'Должно быть уникальным',
          removeLeadSpaces: 'Исключите пробелы перед названием',
        },
      },
    },
    chat: {
      newMessage: 'Новое сообщение',
      typeYourMessage: 'Введите сообщение...',
      messagesCount_zero: 'сообщений',
      messagesCount_one: 'сообщение',
      messagesCount_few: 'сообщения',
      messagesCount_many: 'сообщений',
    },
    header: {
      logout: 'Выйти',
    },
  },
}

export default ru
