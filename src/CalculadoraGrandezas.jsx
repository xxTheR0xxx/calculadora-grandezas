import React, { useState } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Input } from './components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './components/ui/select';
import { ChevronDown } from 'lucide-react';
import helderImage from './helder.jpg';

const grupos = [
  {
    nome: "IA & Linguagem",
    categorias: ['Cálculo de Tokens (LLMs)']
  },
  {
    nome: "Física",
    categorias: [
      'Comprimento', 'Massa', 'Área', 'Volume', 'Temperatura', 'Pressão', 'Velocidade', 'Aceleração', 'Energia', 'Potência', 'Densidade'
    ]
  },
  {
    nome: "Tempo & Frequência",
    categorias: ['Tempo', 'Frequência', 'Período']
  },
  {
    nome: "Informática",
    categorias: ['Armazenamento de Dados', 'Taxa de Transferência']
  },
  {
    nome: "Química",
    categorias: ['Concentração', 'Viscosidade']
  },
  {
    nome: "Moeda",
    categorias: ['Conversão Monetária']
  }
];

const unidades = {
  'Cálculo de Tokens (LLMs)': [
    { nome: 'Tokens GPT-3.5', fator: 1 },
    { nome: 'Palavras', fator: 0.75 },
    { nome: 'Caracteres', fator: 4 },
  ],
  Comprimento: [
    { nome: 'Metro', fator: 1 },
    { nome: 'Centímetro', fator: 100 },
    { nome: 'Milímetro', fator: 1000 },
    { nome: 'Quilômetro', fator: 0.001 },
    { nome: 'Polegada', fator: 39.3701 },
    { nome: 'Pé', fator: 3.28084 },
  ],
  Massa: [
    { nome: 'Quilograma', fator: 1 },
    { nome: 'Grama', fator: 1000 },
    { nome: 'Miligrama', fator: 1e6 },
    { nome: 'Tonelada', fator: 0.001 },
    { nome: 'Libra', fator: 2.20462 },
  ],
  Temperatura: ['Celsius', 'Fahrenheit', 'Kelvin'],
  Área: [
    { nome: 'Metro quadrado', fator: 1 },
    { nome: 'Centímetro quadrado', fator: 10000 },
    { nome: 'Milímetro quadrado', fator: 1e6 },
    { nome: 'Quilômetro quadrado', fator: 1e-6 },
    { nome: 'Hectare', fator: 0.0001 },
    { nome: 'Acre', fator: 0.000247105 },
  ],
  Volume: [
    { nome: 'Litro', fator: 1 },
    { nome: 'Mililitro', fator: 1000 },
    { nome: 'Metro cúbico', fator: 0.001 },
    { nome: 'Centímetro cúbico', fator: 1000 },
    { nome: 'Galão (US)', fator: 0.264172 },
  ],
  Tempo: [
    { nome: 'Segundo', fator: 1 },
    { nome: 'Minuto', fator: 1/60 },
    { nome: 'Hora', fator: 1/3600 },
    { nome: 'Dia', fator: 1/86400 },
  ],
  Frequência: [
    { nome: 'Hertz', fator: 1 },
    { nome: 'Quilohertz', fator: 0.001 },
    { nome: 'Megahertz', fator: 0.000001 },
    { nome: 'Gigahertz', fator: 0.000000001 },
  ],
  'Armazenamento de Dados': [
    { nome: 'Byte', fator: 1 },
    { nome: 'Kilobyte', fator: 0.001 },
    { nome: 'Megabyte', fator: 0.000001 },
    { nome: 'Gigabyte', fator: 0.000000001 },
    { nome: 'Terabyte', fator: 0.000000000001 },
  ],
  'Conversão Monetária': ['BRL', 'USD', 'EUR', 'GBP', 'JPY', 'ARS']
};

export default function CalculadoraGrandezas() {
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [resultado, setResultado] = useState('');
  const [aberto, setAberto] = useState({});

  const converter = async () => {
    let resultadoFinal = '';
    const val = parseFloat(valor);

    if (categoria === 'Temperatura') {
      if (origem === 'Celsius' && destino === 'Fahrenheit') resultadoFinal = val * 9 / 5 + 32;
      else if (origem === 'Celsius' && destino === 'Kelvin') resultadoFinal = val + 273.15;
      else if (origem === 'Fahrenheit' && destino === 'Celsius') resultadoFinal = (val - 32) * 5 / 9;
      else if (origem === 'Fahrenheit' && destino === 'Kelvin') resultadoFinal = (val - 32) * 5 / 9 + 273.15;
      else if (origem === 'Kelvin' && destino === 'Celsius') resultadoFinal = val - 273.15;
      else if (origem === 'Kelvin' && destino === 'Fahrenheit') resultadoFinal = (val - 273.15) * 9 / 5 + 32;
      else resultadoFinal = val;
    } else if (categoria === 'Conversão Monetária') {
      const res = await fetch(`https://api.exchangerate.host/convert?from=${origem}&to=${destino}&amount=${val}`);
      const data = await res.json();
      resultadoFinal = data.result;
    } else {
      const origemFator = unidades[categoria]?.find(u => u.nome === origem)?.fator || 1;
      const destinoFator = unidades[categoria]?.find(u => u.nome === destino)?.fator || 1;
      resultadoFinal = val * (destinoFator / origemFator);
    }

    setResultado(resultadoFinal.toFixed(4));
  };

  const opcoes = categoria === 'Temperatura' || categoria === 'Conversão Monetária'
    ? unidades[categoria].map(u => ({ nome: u }))
    : unidades[categoria] || [];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-green-950 text-green-100" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}>
      <aside className="w-full md:w-72 bg-green-900 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-yellow-200">Calculadora de Grandezas</h2>
        {grupos.map(({ nome, categorias }) => (
          <div key={nome} className="mb-4 group">
            <button
              className="flex items-center justify-between w-full text-left text-yellow-300 font-semibold text-sm mb-2"
              onClick={() => setAberto(prev => ({ ...prev, [nome]: !prev[nome] }))}
            >
              {nome} <ChevronDown className={`transition-transform ${aberto[nome] ? 'rotate-180' : ''}`} size={16} />
            </button>
            {aberto[nome] && (
              <div className="space-y-1">
                {categorias.map(cat => (
                  <button
                    key={cat}
                    disabled={!unidades[cat]}
                    className={`block w-full text-left px-3 py-1 text-sm rounded ${categoria === cat ? 'bg-green-800' : 'hover:bg-green-700'} ${!unidades[cat] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => {
                      setCategoria(cat);
                      setOrigem('');
                      setDestino('');
                      setValor('');
                      setResultado('');
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {!categoria ? (
          <div className="text-center max-w-2xl mx-auto mt-12">
            <h1 className="text-3xl font-bold mb-4 text-yellow-200">Bem-vindo à Calculadora de Grandezas</h1>
            <p className="text-base text-green-100">
              Esta é uma iniciativa do <strong>Prof. Helder Carozzi</strong>, docente do curso de Engenharia Elétrica do Centro Universitário FAG e coordenador dos projetos de pesquisa e extensão das Engenharias.
            </p>
            <img src={helderImage} alt="Professor Helder Carozzi" className="mx-auto mt-8 rounded-2xl shadow-xl w-48" />
          </div>
        ) : (
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-yellow-200">{categoria}</h2>
            <Input type="number" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select onValueChange={setOrigem} value={origem}>
                <SelectTrigger><SelectValue placeholder="Origem" /></SelectTrigger>
                <SelectContent>
                  {opcoes.map(u => (
                    <SelectItem key={u.nome} value={u.nome}>{u.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={setDestino} value={destino}>
                <SelectTrigger><SelectValue placeholder="Destino" /></SelectTrigger>
                <SelectContent>
                  {opcoes.map(u => (
                    <SelectItem key={u.nome} value={u.nome}>{u.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <button onClick={converter} className="bg-yellow-400 text-green-900 px-4 py-2 rounded hover:bg-yellow-300 w-full">Converter</button>
            {resultado !== '' && (
              <Card><CardContent className="text-center text-xl font-semibold text-yellow-200">Resultado: {resultado}</CardContent></Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
