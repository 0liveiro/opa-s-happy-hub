import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, Wheat, X } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

type Product = { id: number; name: string; description: string; price: number; category: string; emoji: string };

const products: Product[] = [
  { id: 1, name: "Pão francês", description: "Crocante por fora, macio por dentro.", price: 0.9, category: "Pães", emoji: "🥖" },
  { id: 2, name: "Pão de leite", description: "Levinho, dourado e irresistível.", price: 7.5, category: "Pães", emoji: "🍞" },
  { id: 3, name: "Pão integral", description: "Saboroso e cheio de grãos.", price: 12.9, category: "Pães", emoji: "🌾" },
  { id: 4, name: "Croissant", description: "Folhado, amanteigado e fresquinho.", price: 8.9, category: "Doces", emoji: "🥐" },
  { id: 5, name: "Pão de queijo", description: "Quentinho, com queijo de verdade.", price: 6.9, category: "Lanches", emoji: "🧀" },
  { id: 6, name: "Cesta do café", description: "Pães e quitutes para começar bem o dia.", price: 39.9, category: "Kits", emoji: "☕" },
];

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function Index() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [openCart, setOpenCart] = useState(false);
  const [category, setCategory] = useState("Todos");

  const categories = ["Todos", "Pães", "Doces", "Lanches", "Kits"];
  const filtered = category === "Todos" ? products : products.filter((p) => p.category === category);
  const items = useMemo(() => products.filter((p) => cart[p.id]), [cart]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = items.reduce((sum, p) => sum + p.price * cart[p.id], 0);

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id: number) => setCart((c) => {
    const next = { ...c, [id]: (c[id] || 0) - 1 };
    if (next[id] <= 0) delete next[id];
    return next;
  });

  const checkout = () => {
    const text = ["Olá! Quero fazer um pedido:", ...items.map((p) => `${cart[p.id]}x ${p.name} — ${money.format(p.price * cart[p.id])}`), `Total: ${money.format(total)}`].join("\n");
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#34251d]">
      <header className="sticky top-0 z-20 border-b border-[#eadbc9] bg-[#fffaf2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="flex items-center gap-2 font-black tracking-tight text-xl"><span className="grid size-10 place-items-center rounded-full bg-[#8d4b2e] text-white"><Wheat size={20} /></span>Pão & Prosa</a>
          <nav className="hidden gap-7 text-sm font-semibold md:flex"><a href="#cardapio" className="hover:text-[#8d4b2e]">Cardápio</a><a href="#como-funciona" className="hover:text-[#8d4b2e]">Como pedir</a><a href="#sobre" className="hover:text-[#8d4b2e]">Sobre nós</a></nav>
          <button onClick={() => setOpenCart(true)} className="relative flex items-center gap-2 rounded-full bg-[#34251d] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#8d4b2e]"><ShoppingBag size={18} /> Sacola {count > 0 && <span className="grid size-5 place-items-center rounded-full bg-[#f4b942] text-xs text-[#34251d]">{count}</span>}</button>
        </div>
      </header>

      <section id="inicio" className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex rounded-full bg-[#f4e1c7] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#8d4b2e]">Feito hoje. Servido quentinho.</span>
            <h1 className="mt-6 max-w-xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">O cheirinho de pão que deixa o dia melhor.</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#6e5a4d]">Pães artesanais, quitutes e café para você pedir em poucos cliques e receber fresquinho na sua mesa.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#cardapio" className="rounded-full bg-[#8d4b2e] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#8d4b2e]/20 transition hover:-translate-y-0.5">Ver cardápio</a><a href="#como-funciona" className="rounded-full border border-[#cdb9a7] px-7 py-3.5 font-bold transition hover:bg-white">Como funciona</a></div>
            <div className="mt-9 flex gap-7 text-sm text-[#6e5a4d]"><span>★ 4,9/5</span><span>•</span><span>Forno todos os dias</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[3rem] bg-[#f1d2aa] rotate-3" />
            <div className="relative rounded-[2.5rem] bg-[#d9a56f] p-8 shadow-2xl"><div className="grid aspect-square place-items-center rounded-[2rem] bg-[#f6d9b0] text-[10rem] shadow-inner md:text-[12rem]">🥖</div><div className="mt-5 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-widest text-[#6b4028]">Especial da casa</p><p className="text-2xl font-black">Pão artesanal</p></div><span className="rounded-full bg-white px-4 py-2 font-black">a partir de R$ 7,50</span></div></div>
          </div>
        </div>
      </section>

      <section id="cardapio" className="border-y border-[#eadbc9] bg-white/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-black uppercase tracking-widest text-[#b26b43]">Nosso cardápio</p><h2 className="mt-2 text-4xl font-black">Escolha seus favoritos</h2></div><div className="flex flex-wrap gap-2">{categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${category === c ? "bg-[#34251d] text-white" : "bg-[#f7eee4] hover:bg-[#eadbc9]"}`}>{c}</button>)}</div></div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((p) => <article key={p.id} className="group rounded-3xl border border-[#eadbc9] bg-[#fffaf2] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="grid aspect-[1.35] place-items-center rounded-2xl bg-[#f5e1c6] text-7xl transition group-hover:scale-[1.01]">{p.emoji}</div><div className="pt-5"><div className="flex items-start justify-between gap-3"><div><h3 className="text-xl font-black">{p.name}</h3><p className="mt-1 text-sm leading-6 text-[#766357]">{p.description}</p></div><strong className="whitespace-nowrap text-lg">{money.format(p.price)}</strong></div><button onClick={() => { add(p.id); setOpenCart(true); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8d4b2e] py-3 font-bold text-white transition hover:bg-[#713a23]"><Plus size={18} /> Adicionar</button></div></article>)}</div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-6xl px-5 py-16"><div className="grid gap-5 md:grid-cols-3">{[["01", "Monte sua sacola", "Escolha os pães e quitutes que você mais gosta."], ["02", "Confira o pedido", "Veja quantidades e o total antes de finalizar."], ["03", "Peça pelo WhatsApp", "Enviamos o resumo para você combinar entrega ou retirada."]].map(([n, t, d]) => <div key={n} className="rounded-3xl bg-[#34251d] p-7 text-white"><span className="text-sm font-black text-[#f4b942]">{n}</span><h3 className="mt-5 text-xl font-black">{t}</h3><p className="mt-2 leading-7 text-[#d8c8bc]">{d}</p></div>)}</div></section>

      <footer id="sobre" className="bg-[#34251d] text-white"><div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-2 text-xl font-black"><Wheat size={21} /> Pão & Prosa</div><p className="mt-2 text-sm text-[#cdbfb5]">Pão de verdade, feito com carinho.</p></div><p className="text-sm text-[#cdbfb5]">© 2026 Pão & Prosa</p></div></footer>

      {openCart && <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpenCart(false)}><aside onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fffaf2] p-5 shadow-2xl"><div className="flex items-center justify-between border-b border-[#eadbc9] pb-4"><div><h2 className="text-2xl font-black">Sua sacola</h2><p className="text-sm text-[#766357]">{count} {count === 1 ? "item" : "itens"}</p></div><button onClick={() => setOpenCart(false)} className="rounded-full p-2 hover:bg-[#f0e3d6]"><X /></button></div><div className="flex-1 space-y-3 overflow-y-auto py-5">{items.length === 0 ? <div className="grid h-full place-items-center text-center text-[#766357]"><ShoppingBag className="mx-auto" size={42} /><p className="mt-3 font-bold">Sua sacola está vazia.</p></div> : items.map((p) => <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-[#eadbc9] bg-white p-3"><span className="grid size-12 place-items-center rounded-xl bg-[#f5e1c6] text-2xl">{p.emoji}</span><div className="min-w-0 flex-1"><p className="font-bold">{p.name}</p><p className="text-sm text-[#766357]">{money.format(p.price)}</p></div><div className="flex items-center gap-2"><button onClick={() => remove(p.id)} className="grid size-8 place-items-center rounded-full border"><Minus size={14} /></button><span className="w-4 text-center text-sm font-bold">{cart[p.id]}</span><button onClick={() => add(p.id)} className="grid size-8 place-items-center rounded-full border"><Plus size={14} /></button></div><button onClick={() => setCart((c) => { const n = { ...c }; delete n[p.id]; return n; })} className="p-2 text-[#a24f38]"><Trash2 size={17} /></button></div>)}</div>{items.length > 0 && <div className="border-t border-[#eadbc9] pt-5"><div className="mb-4 flex justify-between text-lg font-black"><span>Total</span><span>{money.format(total)}</span></div><button onClick={checkout} className="w-full rounded-2xl bg-[#25d366] py-4 font-black text-white transition hover:brightness-95">Finalizar pelo WhatsApp</button><p className="mt-3 text-center text-xs text-[#766357]">O WhatsApp abrirá com o resumo do seu pedido.</p></div>}</aside></div>}
    </main>
  );
}
