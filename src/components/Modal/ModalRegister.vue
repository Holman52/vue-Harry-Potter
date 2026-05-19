<template>
  <div class="auth">
    <h2>Регистрация</h2>
    <form @submit.prevent="validateForm" class="auth-form">
      <div class="auth-block">
        <label class="auth-label" for="login">Логин</label>
        <input class="auth-input" v-model="dataForm.login" type="text" id="login">
        <span v-if="errors.login" class="error">{{ errors.login }}</span>
      </div>

      <div class="auth-block">
        <label class="auth-label" for="password">Пароль</label>
        <input class="auth-input" v-model="dataForm.password" type="password" id="password">
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <div class="flex-row">
        <div class="auth-block">
          <label class="auth-label" for="name">Имя</label>
          <input class="auth-input" v-model="dataForm.name" type="text" id="name">
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>
        <div class="auth-block">
          <label class="auth-label" for="surname">Фамилия</label>
          <input class="auth-input" v-model="dataForm.surname" type="text" id="surname">
          <span v-if="errors.surname" class="error">{{ errors.surname }}</span>
        </div>
      </div>

      <div class="auth-block">
        <label class="auth-label" for="otchestvo">Отчество</label>
        <input class="auth-input" v-model="dataForm.otchestvo" type="text" id="otchestvo">
        <span v-if="errors.otchestvo" class="error">{{ errors.otchestvo }}</span>
      </div>

      <div class="flex-row">
        <div class="auth-block">
          <label class="auth-label" for="tel">Номер телефона</label>
          <input class="auth-input" v-model="dataForm.tel" type="tel" id="tel" placeholder="8(XXX)XXX-XX-XX">
          <span v-if="errors.tel" class="error">{{ errors.tel }}</span>
        </div>
        <div class="auth-block">
          <label class="auth-label" for="old">Возраст</label>
          <input class="auth-input" v-model="dataForm.old" min="1" step="1" type="number" id="old">
          <span v-if="errors.old" class="error">{{ errors.old }}</span>
        </div>
      </div>

      <div class="auth-block">
        <p class="auth-label">Пол</p>
        <div class="flex-row radio-group">
          <label class="radio-label">
            <input type="radio" name="gender" value="male" v-model="dataForm.gender"> Мужской
          </label>
          <label class="radio-label">
            <input type="radio" name="gender" value="female" v-model="dataForm.gender"> Женский
          </label>
        </div>
        <span v-if="errors.gender" class="error">{{ errors.gender }}</span>
      </div>

      <div class="auth-block">
        <p class="auth-label">Любимый факультет</p>
        <div class="faculties-grid">
          <label class="checkbox-label">
            <input type="checkbox" value="Гриффиндор" v-model="dataForm.fakultets"> Гриффиндор
          </label>
          <label class="checkbox-label">
            <input type="checkbox" value="Когтевран" v-model="dataForm.fakultets"> Когтевран
          </label>
          <label class="checkbox-label">
            <input type="checkbox" value="Пуффендуй" v-model="dataForm.fakultets"> Пуффендуй
          </label>
          <label class="checkbox-label">
            <input type="checkbox" value="Слизерин" v-model="dataForm.fakultets"> Слизерин
          </label>
        </div>
        <span v-if="errors.fakultets" class="error">{{ errors.fakultets }}</span>
      </div>

      <button type="submit" class="submit-btn">Зарегистрироваться</button>
    </form>

    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const dataForm = ref({
  login: '',
  password: '',
  name: '',
  surname: '',
  otchestvo: '',
  old: '',
  tel: '',
  gender: '',
  fakultets: []
});

const errors = ref({
  login: '',
  password: '',
  name: '',
  surname: '',
  otchestvo: '',
  old: '',
  tel: '',
  gender: '',
  fakultets: ''
});

const successMessage = ref('');

const regex = {
  login: /^.*[A-Za-z]{3,20}.*$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  name: /^[а-яА-ЯёЁ]+$/,
  surname: /^[а-яА-ЯёЁ]{2,}$/,
  patronymic: /^[а-яА-ЯёЁ]{2,}$/,
  phone: /^8\d{10}$/,
  gender: /^(male|female)$/
};

const validateForm = () => {
  let isValid = true;

  Object.keys(errors.value).forEach(key => {
    errors.value[key] = '';
  });
  successMessage.value = '';

  if (!regex.login.test(dataForm.value.login)) {
    errors.value.login = 'Логин должен содержать 3-20 символов';
    isValid = false;
  }

  if (!regex.password.test(dataForm.value.password)) {
    errors.value.password = 'Пароль должен содержать минимум 6 символов, хотя бы одну букву и одну цифру';
    isValid = false;
  }

  if (!regex.name.test(dataForm.value.name)) {
    errors.value.name = 'Имя должно начинаться с заглавной буквы и содержать только русские буквы (минимум 2 символа)';
    isValid = false;
  } else if (dataForm.value.name.length < 2) {
    errors.value.name = 'Имя должно содержать больше одного символа';
    isValid = false;
  }

  if (!regex.surname.test(dataForm.value.surname)) {
    errors.value.surname = 'Фамилия должна начинаться с заглавной буквы и содержать только русские буквы (минимум 3 символа)';
    isValid = false;
  } else if (dataForm.value.surname.length < 3) {
    errors.value.surname = 'Фамилия должна содержать больше двух символов';
    isValid = false;
  }

  if (!regex.patronymic.test(dataForm.value.otchestvo)) {
    errors.value.otchestvo = 'Отчество должно начинаться с заглавной буквы и содержать только русские буквы (минимум 3 символа)';
    isValid = false;
  } else if (dataForm.value.otchestvo.length < 3) {
    errors.value.otchestvo = 'Отчество должно содержать больше двух символов';
    isValid = false;
  }

  if (!regex.phone.test(dataForm.value.tel)) {
    errors.value.tel = 'Телефон должен быть в формате 8(XXX)XXX-XX-XX';
    isValid = false;
  }

  const age = parseInt(dataForm.value.old);
  if (isNaN(age) || age < 10) {
    errors.value.old = 'Возраст должен быть не менее 10 лет';
    isValid = false;
  }

  if (!regex.gender.test(dataForm.value.gender)) {
    errors.value.gender = 'Выберите пол';
    isValid = false;
  }

  if (dataForm.value.fakultets.length === 0) {
    errors.value.fakultets = 'Выберите хотя бы один факультет';
    isValid = false;
  }

  const validFaculties = ['Гриффиндор', 'Когтевран', 'Пуффендуй', 'Слизерин'];
  const hasInvalidFaculty = dataForm.value.fakultets.some(f => !validFaculties.includes(f));
  if (hasInvalidFaculty) {
    errors.value.fakultets = 'Выбран недопустимый факультет';
    isValid = false;
  }
  if (localStorage.getItem(dataForm.value.login)){
    errors.value.login = 'Такой пользователь уже есть'
    isValid = false;
  }
  if (isValid) {
    successMessage.value = 'Регистрация успешно завершена!';
    localStorage.setItem(dataForm.value.login ,JSON.stringify(dataForm.value))
  }
};
</script>

<style scoped>

</style>