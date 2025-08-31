<script setup>
import {reactive} from "vue";
import MainContainer from "@/components/container/MainContainer.vue";
import CodeBlock from "@/components/block-code/CodeBlock.vue";
import {hash, deactivate, setResult, map, logger, preparation} from '@/data/codes/php/started/config.js';
import TableContents from "@/components/table-contents/TableContents.vue";
import ApiLink from "@/components/link/ApiLink.vue";
import AlertMessage from "@/components/messages/AlertMessage.vue";
import CardContainer from "@/components/container/CardContainer.vue";
import Type from "@/utils/alert/type";

const data = reactive({
  tableContents: [
    {
      title: 'Введение',
      hash: 'vvedenie',
    },
    {
      title: 'Идентификатор обмена',
      hash: 'hash',
    },
    {
      title: 'Включение деактивации',
      hash: 'on-deactivate'
    },
    {
      title: 'Результат обмена',
      hash: 'set-result'
    },
    {
      title: 'Карта обмена',
      hash: 'map'
    },
    {
      title: 'Логирование',
      hash: 'logger',
    },
    {
      title: 'Преобразователь',
      hash: 'preparation'
    }
  ]
});
</script>

<template>
  <main-container>
    <h2>Конфигурирование</h2>
    <table-contents :items="data.tableContents" />
  </main-container>

  <card-container>
    <template #header>
      <h2 id="vvedenie">Введение</h2>
    </template>
    <p>
      Все основные конфигурации обмена указываются в его конструктор.

      <br>
      Конфигурация представляет собой ассоциативный массив. Конфигурация обмена является защищенной на чтение и изменение из вне.
      После передачи конфигурации в конструктор обмена мы больше не сможем их скорректировать и прочитать.
      Могут встречаться частные случае, когда пользователю предоставляется возможность переопределить конфигурацию

      <br>
      Конфигурация позволяет настроить поведение вашего обмена и указать куда производится обмен.
      Если указать некорректную конфигурацию, то при инициализации обмена мы можем получить исключение - стоит учесть данный момент.
    </p>

    <p>
      Все стандартные обмены являются наследниками класса <a href="./api/classes/Sholokhov-Exchange-AbstractExchange.html" target="_blank">AbstractExchange</a>, который позволяет настроить:
    </p>
    <ul>
      <li>Включение деактивации</li>
      <li>Результат обмена</li>
      <li>Карта обмена</li>
    </ul>

    <p>
      Каждый отдельно взятый обмен содержит свои доступные параметры и значения. Все доступные обмены описаны в блоке импорт.
    </p>
  </card-container>

  <card-container>
    <h2 id="hash">Идентификатор обмена</h2>
    <p>
      Идентификатор обмена служит, для разграничения данных с которыми идет взаимодействия и обеспечить корректную работу обмена с одной сущностью одновременно.
    </p>

    <alert-message>
      Для избежания конфликтов ситуаций рекомендуется указывать уникальный идентификатор обмена
    </alert-message>

    <alert-message :type="Type.warning">
      Не каждый обмен поддерживает разграничение данных на основе идентификатора.
      Перед использованием необходимо ознакомиться с документацией используемого обмена
    </alert-message>

    <p>
      Одним из возможных ситуаций по которой следует указывать идентификатор - несколько импортов в одну сущность и работа только со своими элементами сущности
    </p>

    <CodeBlock :code="hash" />
  </card-container>

  <card-container>
    <h3 id="on-deactivate">Включение деактивации</h3>
    <p>
      После обмена данных производит деактивацию всех значений, которые не приняли участие.
      <br>
      По умолчанию деактивацию отключена. Логика деактивации регламентируется наследником, и она не является обязательной.
      Если наследник откажется реализовывать данный функционал, то данный флаг не повлияет на результат обмена.
    </p>

    <CodeBlock :code="deactivate" />
  </card-container>

  <card-container>
    <template #header>
      <h2 id="set-result">Результат обмена</h2>
    </template>
    <p>
      Каждый обмен обязан вернуть объект результата выполнения, который реализует интерфейс <a href="./api/classes/Sholokhov-Exchange-Messages-ExchangeResultInterface.html" target="_blank">ExchangeResultInterface</a>
      <br>
      Результат содержит все ошибки, которые возникли и все идентификаторы значений, которые принимали участие в импорте\экспорте.
      В угоду оптимизации по умолчанию результат не хранит идентификаторы значений, и для этого нам необходимо сконфигурировать обмен.
      <br>
    </p>

    <CodeBlock :code="setResult" />

    <p>
      Метод <b>setResultRepositoryFactory</b> принимает значение, которое является <a href="https://www.php.net/manual/en/language.types.callable.php" target="_blank">callable</a>,
      и вернет новый объект хранилища реализующий интерфейс <a href="./api/classes/Sholokhov-Exchange-Repository-Result-ResultRepositoryInterface.html" target="_blank">ResultRepositoryInterface</a>.
    </p>
  </card-container>

  <card-container>
    <h2 id="map">Карта обмена</h2>
    <p>
      Карта обмена хранится в отдельном хранилище <b>Sholokhov\Exchange\Repository\Map\MappingRegistry</b> у которого есть метод <b>setFields</b>, который ожидает массив объектов описывающих связи.

      <br>
      Разберем простой пример импорта элементов информационного блока:
      Необходимо импортировать название элемента и изображение в пользовательское свойство.
    </p>

    <CodeBlock :code="map" />
  </card-container>

  <card-container>
    <h2 id="logger">Логирование</h2>
    <p>
      Каждый обмен обязан производить логирование результата своей работы.
      Логирование реализована посредством <a href="https://www.php-fig.org/psr/psr-3/" target="_blank">PSR-3</a>, и позволяет использовать произвольный механизм журналирования.
      <br>
      Обмен по умолчанию не инициализирует механизм логирования, а производит делегирование на разработчика, который подключает обмен.
      <br>
      Рассмотрим пример указания произвольного механизма журналирования
    </p>
    <CodeBlock :code="logger" />
  </card-container>

  <card-container>
    <h2 id="preparation">Преобразователь</h2>
    <p>
      Преобразователь данных работает с нормализованными данными(обработанными и приведенными к типу данных с которой умеет работать сущность).
      <br>
      Основное предназначение преобразователя:
    </p>

    <ul>
      <li>Изменение типа данных</li>
      <li>Запуск вложенного импорта, если значение свойства связано с другой сущностью</li>
    </ul>

    <p>
      Все стандартные обмены имеют свой набор зарегистрированных преобразователей.
      Обмен дает возможность указать свои пользовательские преобразователи, которые будут вызываться в первую очередь.
      Преобразователь реализовывает интерфейс <api-link path="classes/Sholokhov-Exchange-Preparation-PreparationInterface.html">PreparationInterface</api-link>.
      <br>
      <alert-message>
        Вызывается <b>только первый</b> подходящий преобразователь
      </alert-message>
    </p>

    <CodeBlock :code="preparation" />

  </card-container>
</template>