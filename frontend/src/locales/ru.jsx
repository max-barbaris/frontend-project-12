const ru = {
  translation: {
    global: {
      hexletChat: 'Hexlet Chat',
      cancel: 'Отменить',
      submit: 'Отправить',
      delete: 'Удалить',
      channelName: 'Имя канала',
      loading: 'Загрузка',
      errors: {
        network: 'Ошибка сети',
        unknown: 'Неизвестная ошибка',
      },
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
        },
      },
      signupForm: {
        yourNickname: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        registration: 'Регистрация',
        register: 'Зарегистрироваться',
        error: {
          requiredField: 'Обязательное поле',
          usernameLength: 'От 3 до 20 символов',
          passwordLength: 'Не менее 6 символов',
          passwordsMustMatch: 'Пароли должны совпадать',
          userAlreadyExist: 'Такой пользователь уже существует',
        },
      },
    },
    channels: {
      channels: 'Каналы',
      addChannel: 'Добавить канал',
      rename: 'Переименовать',
      delete: 'Удалить',
      channelControl: 'Управление каналом',
      channelAddedSuccessfully: 'Канал создан',
      channelDeletedSuccessfully: 'Канал удалён',
      channelRenamedSuccessfully: 'Канал переименован',
      addForm: {
        addChannel: 'Добавить канал',
        error: {
          requiredField: 'Обязательное поле',
          length: 'От 3 до 20 символов',
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
          length: 'От 3 до 20 символов',
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
    notFoundPage: {
      pageNotFound: 'Страница не найдена',
      butYouCanMove: 'Но вы можете перейти',
      toHomePage: 'на главную страницу',
    },
    header: {
      logout: 'Выйти',
    },
  },
}

export default ru
