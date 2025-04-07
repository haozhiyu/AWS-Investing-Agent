export async function incrementPageView(): Promise<number> {
  // 返回一个模拟的页面访问计数
  return Math.floor(Math.random() * 1000) + 1;
}
