var state = {
  strMax: 9,
  num: $('.num'),
  digit: $('.digit'),
  op: $('.op'),
  eq: $('.eq'),
  dot: $('.dot'),
  minus: $('.plus__minus'),
  delete: $('.delete'),
  text: '',
  dot: $('.dot'),
  input: $('.input'),
  memory1: 0,
  memory2: 0,
  operation: '',
}
function setState(value){
  state.text += value;
};
$(state.num).on('click', function(e){
  if (state.text.length < state.strMax){
    var target = $(e.target); 
    if(state.text === '+' || state.text === '-' || state.text === '*' || state.text === '/'){
      state.operation = state.text;
      state.text = '';
      console.log(state.memory1);
    } 
    setState(target.attr('value'));
    $(state.input).text(state.text);
  }
});
$(state.minus).on('click', function(e){
  if (state.text.length>0) {
    if (state.text === '-' || state.text === '+' || state.text === '*' || state.text === '/') {
      return false;
    } else if (state.text.indexOf('-') + 1) {
      state.text = state.text.replace('-', '');
      $(state.input).text(state.text);
    } else {
      state.text = '-' + state.text;
      $(state.input).text(state.text);
    }
  } 
});
$(state.dot).on('click', function(e){
  if(state.text.indexOf('.') + 1) {
    return false;
  } else {
    setState('.');
  }
});
$(state.op).on('click', function(e){  
  var target = $(e.target); 
  if(state.text.length > 0 && 
     state.text != '+' &&
     state.text != '-' &&
     state.text != '*' && 
     state.text != '/') {
    if (state.operation === '') {
      state.memory1 = +state.text;
    }else if (state.operation === '+') {
      state.memory1 += +state.text;
    } else if (state.operation === '-') {
      state.memory1 -= +state.text;
    } else if (state.operation === '*') {
      state.memory1 *= +state.text;
    } else if (state.operation === '/') {
      state.memory1 /= +state.text;
    }
    state.operation = '';
    state.text = '';
    state.memory2 = 0;
    setState(target.attr('value'));
    $(state.input).text(state.text);
  } else if (state.text === '+' ||
             state.text === '-' ||
             state.text === '*' ||
             state.text === '/'){
    state.text = '';
    setState(target.attr('value'));
    $(state.input).text(state.text);
  } 
});
$(state.eq).on('click', function(e){  
  if (state.operation.length > 0){
    state.memory2 += +state.text;
    if(state.operation === '+'){
      state.memory1 += state.memory2;
    } else if (state.operation === '-'){
      state.memory1 -= state.memory2;
    } else if (state.operation === '*'){
      state.memory1 *= state.memory2;
    } else if (state.operation === '/'){
      state.memory1 /= state.memory2;
      if (state.memory2 === 0){
        state.memory1 = 0;
      }
    }
    state.memory2 = 0;
    state.operation = '=';
    $(state.input).text(state.memory1);
  }
});
$(state.delete).on('click', function(e){  
  state.text = '';
  state.memory1 = 0;
  state.memory2 = 0;
  state.operation = '';
  $(state.input).text('');
});