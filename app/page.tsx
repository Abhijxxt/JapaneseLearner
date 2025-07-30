export default function Home() {
  return (
    <div className="w-[100%] h-[90vh] bg-slate-100 flex flex-row justify-center items-center">
      <div className="p-20 bg-slate-50">
        <p>外出先で日本語を学ぶ</p>
        <p>Learn Japanese on the go</p>
        <button className="bg-amber-600">Get started</button>
      </div>
      <div>
        <h1>水</h1>
        <p>English: Water</p>
        <p>Furigana: みず</p>
        <p>Romanji: Mizu</p>
      </div>
    </div>
  );
}
