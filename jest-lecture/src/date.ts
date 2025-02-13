export function after3days(){ // 오늘부터 3일뒤 
  const date = new Date();
  date.setDate(date.getDate() + 3)
  return date
}