import React from 'react';
import { Card } from '@/components/ui/card';

const BusinessPlan = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black print:shadow-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-12 border-b-2 border-gray-300 pb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">KALORE</h1>
        <h2 className="text-2xl text-gray-700 mb-2">Plan de Negocio y Escalabilidad Financiera</h2>
        <p className="text-gray-600">Análisis Detallado 2025-2030</p>
        <div className="mt-4 text-sm text-gray-500">
          Fecha: {new Date().toLocaleDateString('es-ES')}
        </div>
      </div>

      {/* Resumen Ejecutivo */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">📊 Resumen Ejecutivo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Modelo de Negocio</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• App de nutrición con IA</li>
              <li>• Freemium + Suscripción</li>
              <li>• Análisis de fotos de comida</li>
              <li>• Coach nutricional personalizado</li>
            </ul>
          </Card>
          <Card className="p-6 border border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Precios</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Anual:</strong> $59.88/año ($4.99/mes)</li>
              <li>• <strong>Mensual:</strong> $9.99/mes</li>
              <li>• <strong>Freemium:</strong> Limitado</li>
              <li>• <strong>Distribución:</strong> 90% anual, 10% mensual</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Análisis de Costes por Usuario */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">💰 Estructura de Costes por Usuario</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">APIs de OpenAI (Coste Principal) - IMPLEMENTACIONES ACTUALES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="font-medium text-gray-800">Análisis de Fotos</div>
              <div className="text-sm text-gray-600">GPT-4o + Vision API</div>
              <div className="text-lg font-bold text-blue-600">$0.08/análisis</div>
              <div className="text-xs text-gray-500">4-5 fotos/día</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="font-medium text-gray-800">Coach Virtual</div>
              <div className="text-sm text-gray-600">GPT-5-mini + Sistema</div>
              <div className="text-lg font-bold text-blue-600">$0.03/mensaje</div>
              <div className="text-xs text-gray-500">1-2 mensajes/día</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="font-medium text-gray-800">Transcripción Voz</div>
              <div className="text-sm text-gray-600">Whisper API</div>
              <div className="text-lg font-bold text-blue-600">$0.006/minuto</div>
              <div className="text-xs text-gray-500">2-3 min/día</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="font-medium text-gray-800">Lookup Nutrición</div>
              <div className="text-sm text-gray-600">GPT-4o-mini</div>
              <div className="text-lg font-bold text-blue-600">$0.01/búsqueda</div>
              <div className="text-xs text-gray-500">3-5 búsquedas/día</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="font-semibold text-gray-800 mb-2">🚨 Coste REAL por Usuario Activo/Mes:</div>
            <div className="text-2xl font-bold text-red-700">$6.50 - $9.80</div>
            <div className="text-sm text-gray-600 mt-1">Promedio actual: $8.15/mes (optimización urgente necesaria a $3.50)</div>
            <div className="text-xs text-gray-500 mt-2">
              Base: 120 análisis fotos ($9.60) + 45 coach ($1.35) + 75 min voz ($0.45) + 120 lookups ($1.20) = $12.60/mes
              <br />Con usuarios menos activos promedio: $8.15/mes
            </div>
          </div>
        </div>
      </section>

      {/* Análisis por Fases */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">🚀 Análisis Financiero por Fases</h2>

        {/* Fase 1: 100 Usuarios */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 bg-blue-50 p-3 rounded">📈 FASE 1: 100 Usuarios (Meses 0-3) ⚠️ NÚMEROS REALES</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$349</div>
              <div className="text-sm text-gray-600">Ingresos/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">$640</div>
              <div className="text-sm text-gray-600">Costes/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">-$291</div>
              <div className="text-sm text-gray-600">PÉRDIDA/mes</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💰 Desglose Ingresos</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• 90 usuarios anuales: $269/mes</li>
                <li>• 10 usuarios mensuales: $80/mes</li>
                <li>• <strong>Total: $349/mes</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💸 Desglose Costes REALES</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Supabase Pro: $25/mes</li>
                <li>• <strong>OpenAI API: $570/mes</strong> (70 usuarios activos)</li>
                <li>• Otros servicios: $45/mes</li>
                <li>• <strong>Total: $640/mes</strong></li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
            <div className="font-medium text-red-800">🚨 CRÍTICO: Esta fase es insostenible</div>
            <ul className="text-sm mt-2 space-y-1 text-red-700">
              <li>• Pérdida de $291/mes = $3,492/año</li>
              <li>• Necesario reducir costes IA urgentemente</li>
              <li>• Implementar límites freemium más estrictos</li>
              <li>• Optimizar desde el día 1</li>
            </ul>
          </div>
        </div>

        {/* Fase 2: 1,000 Usuarios */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 bg-green-50 p-3 rounded">📈 FASE 2: 1,000 Usuarios (Meses 4-12) ⚠️ NÚMEROS REALES</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$3,490</div>
              <div className="text-sm text-gray-600">Ingresos/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">$6,254</div>
              <div className="text-sm text-gray-600">Costes/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">-$2,764</div>
              <div className="text-sm text-gray-600">PÉRDIDA/mes</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💰 Desglose Ingresos</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• 900 usuarios anuales: $2,691/mes</li>
                <li>• 100 usuarios mensuales: $799/mes</li>
                <li>• <strong>Total: $3,490/mes</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💸 Desglose Costes REALES</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Supabase Team: $99/mes</li>
                <li>• <strong>OpenAI API: $5,705/mes</strong> (700 activos)</li>
                <li>• Personal: $300/mes</li>
                <li>• Otros servicios: $150/mes</li>
                <li>• <strong>Total: $6,254/mes</strong></li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
            <div className="font-medium text-red-800">🚨 CRÍTICO: Optimización IA URGENTE</div>
            <ul className="text-sm mt-2 space-y-1 text-red-700">
              <li>• Pérdida de $2,764/mes = $33,168/año</li>
              <li>• Necesario reducir costes IA 60% mínimo</li>
              <li>• Con optimización: -$291/mes (break-even casi)</li>
              <li>• Implementar estrategia freemium más restrictiva</li>
            </ul>
          </div>
        </div>

        {/* Fase 3: 10,000 Usuarios */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 bg-orange-50 p-3 rounded">📈 FASE 3: 10,000 Usuarios (Año 2) - CON OPTIMIZACIÓN</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$34,900</div>
              <div className="text-sm text-gray-600">Ingresos/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">$26,699</div>
              <div className="text-sm text-gray-600">Costes/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$8,201</div>
              <div className="text-sm text-gray-600">Beneficio/mes</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💰 Desglose Ingresos</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• 9,000 usuarios anuales: $26,910/mes</li>
                <li>• 1,000 usuarios mensuales: $7,990/mes</li>
                <li>• <strong>Total: $34,900/mes</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💸 Costes CON OPTIMIZACIÓN IA</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Supabase Enterprise: $599/mes</li>
                <li>• <strong>OpenAI Optimizado: $22,000/mes</strong> (7K activos)</li>
                <li>• Personal (5 personas): $3,500/mes</li>
                <li>• Infrastructure: $300/mes</li>
                <li>• Marketing: $300/mes</li>
                <li>• <strong>Total: $26,699/mes</strong></li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
            <div className="font-medium text-gray-800">⚡ Optimizaciones implementadas:</div>
            <ul className="text-sm mt-2 space-y-1 text-gray-700">
              <li>• Cache inteligente: -30% llamadas API</li>
              <li>• Modelos más baratos: -40% costes</li>
              <li>• Límites freemium: Solo 5 análisis/mes gratis</li>
              <li>• Coste final: $3.15/usuario activo (vs $8.15 inicial)</li>
            </ul>
          </div>
        </div>

        {/* Fase 4: 100,000 Usuarios */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 bg-purple-50 p-3 rounded">📈 FASE 4: 100,000 Usuarios (Años 3-4)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$349,000</div>
              <div className="text-sm text-gray-600">Ingresos/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">$180,000</div>
              <div className="text-sm text-gray-600">Costes/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$169,000</div>
              <div className="text-sm text-gray-600">Beneficio/mes</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💰 Desglose Ingresos</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• 90,000 usuarios anuales: $269,100/mes</li>
                <li>• 10,000 usuarios mensuales: $79,900/mes</li>
                <li>• <strong>Total: $349,000/mes</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💸 Desglose Costes</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Supabase Enterprise+: $2,000/mes</li>
                <li>• OpenAI API: $150,000/mes</li>
                <li>• Personal (15 personas): $15,000/mes</li>
                <li>• Marketing: $10,000/mes</li>
                <li>• Legal/Compliance: $2,000/mes</li>
                <li>• Otros: $1,000/mes</li>
                <li>• <strong>Total: $180,000/mes</strong></li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">📋 Necesidades en esta fase:</div>
            <ul className="text-sm mt-2 space-y-1 text-gray-700">
              <li>• Equipo completo (15+ personas)</li>
              <li>• Oficinas físicas</li>
              <li>• Compliance y legal</li>
              <li>• Partnerships estratégicos</li>
              <li>• Posible Serie A ($2-5M)</li>
            </ul>
          </div>
        </div>

        {/* Fase 5: 1,000,000 Usuarios */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 bg-red-50 p-3 rounded">📈 FASE 5: 1,000,000 Usuarios (Años 5+)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$3,490,000</div>
              <div className="text-sm text-gray-600">Ingresos/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">$1,000,000</div>
              <div className="text-sm text-gray-600">Costes/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$2,490,000</div>
              <div className="text-sm text-gray-600">Beneficio/mes</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💰 Desglose Ingresos</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• 900,000 usuarios anuales: $2,691,000/mes</li>
                <li>• 100,000 usuarios mensuales: $799,000/mes</li>
                <li>• <strong>Total: $3,490,000/mes</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💸 Desglose Costes</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Infrastructure: $50,000/mes</li>
                <li>• OpenAI API (optimizado): $800,000/mes</li>
                <li>• Personal (100+ personas): $100,000/mes</li>
                <li>• Marketing: $30,000/mes</li>
                <li>• Legal/Compliance: $10,000/mes</li>
                <li>• Otros: $10,000/mes</li>
                <li>• <strong>Total: $1,000,000/mes</strong></li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">📋 Necesidades en esta fase:</div>
            <ul className="text-sm mt-2 space-y-1 text-gray-700">
              <li>• Empresa establecida (100+ empleados)</li>
              <li>• Múltiples oficinas internacionales</li>
              <li>• IPO o adquisición estratégica</li>
              <li>• Expansion a nuevos verticales (fitness, medicina)</li>
              <li>• Tecnología propietaria de IA</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">⏰ Timeline de Crecimiento</h2>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">0-3M</div>
            <div className="flex-1">
              <div className="font-bold text-red-800">⚠️ Fase 1: PÉRDIDAS CRÍTICAS</div>
              <div className="text-sm text-red-600">100 usuarios • -$291/mes pérdida • Optimización URGENTE</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">4-12M</div>
            <div className="flex-1">
              <div className="font-bold text-red-800">⚠️ Fase 2: PÉRDIDAS MAYORES</div>
              <div className="text-sm text-red-600">1,000 usuarios • -$2,764/mes pérdida • Sin optimización = quiebra</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">1-2A</div>
            <div className="flex-1">
              <div className="font-bold text-orange-800">⚡ Fase 3: CON OPTIMIZACIÓN IA</div>
              <div className="text-sm text-orange-600">10,000 usuarios • $8,201/mes beneficio • 60% reducción costes IA</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3-4A</div>
            <div className="flex-1">
              <div className="font-bold text-gray-800">Fase 4: Empresa Establecida</div>
              <div className="text-sm text-gray-600">100,000 usuarios • $169,000/mes beneficio • Serie A</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg border">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">5A+</div>
            <div className="flex-1">
              <div className="font-bold text-gray-800">Fase 5: Líder del Mercado</div>
              <div className="text-sm text-gray-600">1,000,000 usuarios • $2,490,000/mes beneficio • IPO/Exit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan de Marketing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">🎯 Plan de Marketing por Fases</h2>

        <div className="space-y-8">
          {/* Fase 1 Marketing */}
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-800 bg-blue-50 p-2 rounded">📱 FASE 1: Marketing Orgánico (0-100 usuarios)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Estrategias</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• <strong>Content Marketing:</strong> Blog sobre nutrición</li>
                  <li>• <strong>Social Media:</strong> Instagram, TikTok (antes/después)</li>
                  <li>• <strong>SEO:</strong> "calculadora calorías", "app nutrición"</li>
                  <li>• <strong>Product Hunt:</strong> Lanzamiento oficial</li>
                  <li>• <strong>Reddit/Forums:</strong> Comunidades fitness</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibent mb-2 text-gray-800">Presupuesto</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• <strong>Total:</strong> $0-200/mes</li>
                  <li>• Herramientas básicas: $50/mes</li>
                  <li>• Contenido freelance: $150/mes</li>
                  <li>• <strong>CAC objetivo:</strong> $2-5</li>
                  <li>• <strong>Canales:</strong> 70% orgánico, 30% pagado</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fase 2 Marketing */}
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-800 bg-green-50 p-2 rounded">📈 FASE 2: Marketing Digital (100-1K usuarios)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Estrategias</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• <strong>Facebook/Instagram Ads:</strong> Targeting fitness</li>
                  <li>• <strong>Google Ads:</strong> Keywords nutrición</li>
                  <li>• <strong>Influencers:</strong> Micro-influencers fitness</li>
                  <li>• <strong>Email Marketing:</strong> Secuencias automatizadas</li>
                  <li>• <strong>Referral Program:</strong> 1 mes gratis por referido</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Presupuesto</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• <strong>Total:</strong> $500-1,000/mes</li>
                  <li>• Facebook Ads: $400/mes</li>
                  <li>• Google Ads: $300/mes</li>
                  <li>• Influencers: $200/mes</li>
                  <li>• <strong>CAC objetivo:</strong> $8-15</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fase 3 Marketing */}
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-800 bg-orange-50 p-2 rounded">🚀 FASE 3: Scaling Marketing (1K-10K usuarios)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Estrategias</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• <strong>Paid Social:</strong> TikTok, YouTube, LinkedIn</li>
                  <li>• <strong>Programmatic:</strong> Display retargeting</li>
                  <li>• <strong>PR & Media:</strong> Revistas fitness, podcasts</li>
                  <li>• <strong>Partnerships:</strong> Gyms, nutricionistas</li>
                  <li>• <strong>App Store Optimization:</strong> ASO avanzado</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Presupuesto</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• <strong>Total:</strong> $5,000-10,000/mes</li>
                  <li>• Paid Social: $4,000/mes</li>
                  <li>• Google Ads: $2,000/mes</li>
                  <li>• PR & Partnerships: $2,000/mes</li>
                  <li>• <strong>CAC objetivo:</strong> $15-25</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fase 4-5 Marketing */}
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-800 bg-purple-50 p-2 rounded">🌍 FASE 4-5: Marketing Corporativo (10K+ usuarios)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Estrategias</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• <strong>TV/OTT:</strong> Anuncios televisión/streaming</li>
                  <li>• <strong>Sponsorships:</strong> Eventos deportivos</li>
                  <li>• <strong>Brand Partnerships:</strong> Nike, Under Armour</li>
                  <li>• <strong>International Expansion:</strong> Localización</li>
                  <li>• <strong>B2B Sales:</strong> Empresas, seguros salud</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Presupuesto</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• <strong>Fase 4:</strong> $10,000-30,000/mes</li>
                  <li>• <strong>Fase 5:</strong> $50,000-100,000/mes</li>
                  <li>• TV/OTT: 40% budget</li>
                  <li>• Digital: 45% budget</li>
                  <li>• <strong>CAC objetivo:</strong> $20-40</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optimizaciones Técnicas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">🚨 ESTRATEGIAS CRÍTICAS DE VIABILIDAD</h2>
        
        <div className="mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-red-800">PROBLEMA CRÍTICO: Costes IA Insostenibles</h3>
          <div className="text-red-700 mb-4">
            Con los costes actuales de $8.15/usuario activo/mes, el negocio generará pérdidas masivas en las primeras fases:
          </div>
          <ul className="text-sm space-y-1 text-red-700 mb-4">
            <li>• <strong>Fase 1:</strong> -$291/mes = $3,492/año pérdida</li>
            <li>• <strong>Fase 2:</strong> -$2,764/mes = $33,168/año pérdida</li>
            <li>• <strong>Total pérdidas primeros 12 meses:</strong> ~$37,000</li>
          </ul>
          <div className="font-bold text-red-800">⚡ ACCIÓN REQUERIDA: Implementación inmediata de optimizaciones</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6 border border-orange-200 bg-orange-50">
            <h3 className="font-bold text-lg mb-4 text-orange-800">🎯 ESTRATEGIA 1: Freemium Restrictivo</h3>
            <ul className="space-y-2 text-sm text-orange-700">
              <li>• <strong>Límite gratuito:</strong> 3 análisis fotos/mes (no 30+)</li>
              <li>• <strong>Coach IA:</strong> 1 mensaje/semana gratis</li>
              <li>• <strong>Transcripción:</strong> Solo premium</li>
              <li>• <strong>Resultado:</strong> 90% usuarios pagan o no usan IA</li>
              <li>• <strong>Reducción coste:</strong> 70% menos uso gratuito</li>
            </ul>
          </Card>
          
          <Card className="p-6 border border-blue-200 bg-blue-50">
            <h3 className="font-bold text-lg mb-4 text-blue-800">⚡ ESTRATEGIA 2: Optimización IA Inmediata</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• <strong>Cache inteligente:</strong> -40% llamadas repetidas</li>
              <li>• <strong>GPT-4o-mini:</strong> Para análisis simples (-60% coste)</li>
              <li>• <strong>Batching:</strong> Procesar múltiples fotos juntas</li>
              <li>• <strong>Pre-filtrado:</strong> Detectar no-comida localmente</li>
              <li>• <strong>Resultado:</strong> Coste $3.15/usuario (vs $8.15)</li>
            </ul>
          </Card>

          <Card className="p-6 border border-green-200 bg-green-50">
            <h3 className="font-bold text-lg mb-4 text-green-800">💰 ESTRATEGIA 3: Precio Dinámico</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• <strong>Plan Basic:</strong> $6.99/mes (análisis limitados)</li>
              <li>• <strong>Plan Pro:</strong> $12.99/mes (ilimitado actual)</li>
              <li>• <strong>Plan Annual:</strong> $79.99/año (mejor valor)</li>
              <li>• <strong>Conversión esperada:</strong> 40% Basic, 60% Pro</li>
              <li>• <strong>ARPU promedio:</strong> $9.80/mes</li>
            </ul>
          </Card>

          <Card className="p-6 border border-purple-200 bg-purple-50">
            <h3 className="font-bold text-lg mb-4 text-purple-800">🔄 ESTRATEGIA 4: Modelos Alternativos</h3>
            <ul className="space-y-2 text-sm text-purple-700">
              <li>• <strong>Claude 3.5 Haiku:</strong> 40% más barato que GPT</li>
              <li>• <strong>Gemini Flash:</strong> Visión más económica</li>
              <li>• <strong>Llama 3.2 Vision:</strong> Modelo local para básicos</li>
              <li>• <strong>Fine-tuning:</strong> GPT-4o-mini personalizado</li>
              <li>• <strong>Resultado:</strong> Diversificación y reducción costes</li>
            </ul>
          </Card>
        </div>

        <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-green-800">✅ RESULTADO CON OPTIMIZACIONES</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$7.50</div>
              <div className="text-sm text-green-700">ARPU optimizado/mes</div>
              <div className="text-xs text-gray-600">(vs $4.99 actual)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$2.80</div>
              <div className="text-sm text-green-700">Coste IA/usuario</div>
              <div className="text-xs text-gray-600">(vs $8.15 actual)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$4.70</div>
              <div className="text-sm text-green-700">Margen/usuario</div>
              <div className="text-xs text-gray-600">(62% margen bruto)</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="font-bold text-green-800">🎯 Rentabilidad desde el mes 1 con estas optimizaciones</div>
          </div>
        </div>
      </section>

      {/* Optimizaciones Técnicas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">⚡ Optimizaciones Técnicas para Reducir Costes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">🧠 Optimización IA</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Cache inteligente:</strong> 40% reducción llamadas</li>
              <li>• <strong>Modelos más baratos:</strong> GPT-4o-mini para tareas simples</li>
              <li>• <strong>Batching requests:</strong> Procesar múltiples juntos</li>
              <li>• <strong>Preprocessing:</strong> Filtrar antes de enviar a IA</li>
              <li>• <strong>Fine-tuning:</strong> Modelos personalizados más baratos</li>
            </ul>
          </Card>
          
          <Card className="p-6 border border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">🏗️ Infraestructura</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>CDN global:</strong> Reducir latencia</li>
              <li>• <strong>Database optimization:</strong> Índices y queries</li>
              <li>• <strong>Caching layers:</strong> Redis para datos frecuentes</li>
              <li>• <strong>Compression:</strong> Imágenes y assets</li>
              <li>• <strong>Auto-scaling:</strong> Recursos bajo demanda</li>
            </ul>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="font-semibold text-gray-800 mb-2">💰 Impacto de Optimizaciones:</div>
          <div className="text-sm text-gray-700">
            Reducción de costes OpenAI de <strong>$1.50/usuario/mes</strong> a <strong>$0.80/usuario/mes</strong> 
            = <strong>47% ahorro</strong> en coste principal
          </div>
        </div>
      </section>

      {/* Riesgos y Mitigaciones */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">⚠️ Riesgos y Mitigaciones</h2>
        
        <div className="space-y-4">
          <div className="p-4 border-l-4 border-red-500 bg-red-50">
            <div className="font-semibold text-red-800 mb-2">🔴 Riesgo Alto: Aumento costes OpenAI</div>
            <div className="text-sm text-red-700">
              <strong>Mitigación:</strong> Diversificar proveedores IA (Anthropic, Google), desarrollar cache inteligente, 
              crear modelos propios fine-tuneados
            </div>
          </div>
          
          <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
            <div className="font-semibold text-orange-800 mb-2">🟡 Riesgo Medio: Competencia grande tech</div>
            <div className="text-sm text-orange-700">
              <strong>Mitigación:</strong> Foco en nicho específico, experiencia superior, partnerships exclusivos, 
              construir moats tecnológicos
            </div>
          </div>
          
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
            <div className="font-semibold text-yellow-800 mb-2">🟡 Riesgo Medio: Regulación datos salud</div>
            <div className="text-sm text-yellow-700">
              <strong>Mitigación:</strong> Compliance GDPR/HIPAA desde inicio, auditorías regulares, 
              legal specialist en equipo
            </div>
          </div>
          
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
            <div className="font-semibold text-blue-800 mb-2">🔵 Riesgo Bajo: Problemas técnicos scaling</div>
            <div className="text-sm text-blue-700">
              <strong>Mitigación:</strong> Arquitectura cloud-native, monitoring proactivo, 
              load testing regular
            </div>
          </div>
        </div>
      </section>

      {/* Conclusiones */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">🎯 Conclusiones Ejecutivas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-green-200 bg-green-50">
            <h3 className="font-bold text-lg mb-4 text-green-800">✅ Puntos Fuertes</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Modelo altamente escalable y rentable</li>
              <li>• Márgenes superiores al 45% en todas las fases</li>
              <li>• Mercado TAM de $25B+ (wellness + nutrition)</li>
              <li>• Tecnología IA como ventaja competitiva</li>
              <li>• Bajo coste de adquisición inicial</li>
            </ul>
          </Card>
          
          <Card className="p-6 border border-blue-200 bg-blue-50">
            <h3 className="font-bold text-lg mb-4 text-blue-800">🚀 Recomendaciones</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Lanzar MVP inmediatamente (Q1 2025)</li>
              <li>• Foco inicial en producto y retención</li>
              <li>• Optimizar costes IA desde el inicio</li>
              <li>• Fundraising Serie A en Fase 3 ($2-5M)</li>
              <li>• Expansion internacional en Fase 4</li>
            </ul>
          </Card>
        </div>

        <div className="mt-6 p-6 bg-gray-900 text-white rounded-lg">
          <h3 className="font-bold text-xl mb-4">💎 Potencial de Exit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">$50M+</div>
              <div className="text-sm">Adquisición estratégica</div>
              <div className="text-xs text-gray-400">(100K usuarios)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">$500M+</div>
              <div className="text-sm">IPO candidato</div>
              <div className="text-xs text-gray-400">(1M usuarios)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">$2B+</div>
              <div className="text-sm">Líder categoría</div>
              <div className="text-xs text-gray-400">(10M+ usuarios)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-200 text-gray-500 text-sm">
        <div className="mb-2">
          <strong>KALORE - Plan de Negocio 2025</strong>
        </div>
        <div>
          Documento confidencial • Generado el {new Date().toLocaleDateString('es-ES')}
        </div>
      </footer>
    </div>
  );
};

export default BusinessPlan;