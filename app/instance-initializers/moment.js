export function initialize(/* appInstance */) {
	moment.updateLocale('ru', {
	    months : {
         format: 'Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря'.split('_'),
         standalone: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
         isFormat: /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?|MMMM?(\[[^\[\]]*\]|\s+)+D[oD]?/  // from 2.14.0
    },
    weekdays : {
         format: 'Воскресение_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
         standalone: 'Воскресение_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
         isFormat: /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?|MMMM?(\[[^\[\]]*\]|\s+)+D[oD]?/  // from 2.14.0
    }
	});
}

export default {
  name: 'moment',
  initialize
};
