import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Select } from "./components/ui/select";

const unidades = {
  Comprimento: {
    Metros: 1,
    Centímetros: 0.01,
    Milímetros: 0.001,
    Quilômetros: 1000,
    Polegadas: 0.0254,
    Pés: 0.3048,
    Jardas: 0.9144,
    Milhas: 1609.34,
  },
  Massa: {
    Quilogramas: 1,
    Gramas: 0.001,
    Miligramas: 0.000001,
    Toneladas: 1000,
    Libras: 0.453592,
    Onças: 0.0283495,
  },
  Tempo: {
    Segundos: 1,
    Minutos: 60,
    Horas: 3600,
    Dias: 86400,
  },
  Temperatura: {
    Celsius: "C",
    Fahrenheit: "F",
    Kelvin: "K",
  }
};

function converterTemperatura(valor, de, para) {
  if (de === para) return valor;
  if (de === "C") return para === "F" ? valor * 9 / 5 + 32 : valor + 273.15;
  if (de === "F") return para === "C" ? (valor - 32) * 5 / 9 : (valor - 32) * 5 / 9 + 273.15;
  if (de === "K") return para === "C" ? valor - 273.15 : (valor - 273.15) * 9 / 5 + 32;
}

export default function CalculadoraGrandezas() {
  const [grupoSelecionado, setGrupoSelecionado] = useState("Comprimento");
  const [valor, setValor] = useState("");
  const [de, setDe] = useState("Metros");
  const [para, setPara] = useState("Centímetros");
  const [resultado, setResultado] = useState("");

  const opcoesGrupo = Object.keys(unidades);
  const opcoesUnidade = Object.keys(unidades[grupoSelecionado]);

  const converter = () => {
    const v = parseFloat(valor);
    if (!v && v !== 0) return;
    if (grupoSelecionado === "Temperatura") {
      const resultado = converterTemperatura(v, unidades[grupoSelecionado][de], unidades[grupoSelecionado][para]);
      setResultado(resultado.toFixed(2));
    } else {
      const fatorDe = unidades[grupoSelecionado][de];
      const fatorPara = unidades[grupoSelecionado][para];
      const resultado = v * (fatorDe / fatorPara);
      setResultado(resultado.toFixed(4));
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white text-gray-900 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-700">Calculadora de Grandezas</h1>
      <div className="grid grid-cols-1 gap-4">
        <Select label="Grupo" options={opcoesGrupo} value={grupoSelecionado} onChange={e => {
          setGrupoSelecionado(e.target.value);
          setDe(Object.keys(unidades[e.target.value])[0]);
          setPara(Object.keys(unidades[e.target.value])[1]);
        }} />
        <Input label="Valor" value={valor} onChange={e => setValor(e.target.value)} />
        <Select label="De" options={opcoesUnidade} value={de} onChange={e => setDe(e.target.value)} />
        <Select label="Para" options={opcoesUnidade} value={para} onChange={e => setPara(e.target.value)} />
        <button onClick={converter} className="bg-green-700 text-white font-semibold py-2 rounded hover:bg-green-800">Converter</button>
        {resultado && (
          <Card>
            <CardContent>
              <p className="text-xl text-center">{valor} {de} = <strong>{resultado} {para}</strong></p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}