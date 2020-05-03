Для серверной части использовать технологии Spring и Hibernate. База данных MongoDB.
Для клиентской части использовать JSP.
Работа с приложением с HTML страницы и с помощью REST-запросов.

Возможность добавлять, просматривать, редактировать и удалять объекты.

---

Для сборки некоторых файлов используется NodeJS.

Stylus->CSS: `stylus src/main/webapp/css`
Pug->JSP: `pug src/main/webapp/ --extension jsp --pretty`
JSX->JS: `babel src/main/webapp --out-dir src/main/webapp --extensions .jsx`
JS->JS: `browserify src/main/webapp/app.js -o src/main/webapp/js/bundle.js`
