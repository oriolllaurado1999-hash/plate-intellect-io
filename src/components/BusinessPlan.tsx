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
          <h3 className="text-lg font-semibold mb-4 text-gray-800">APIs de OpenAI (Coste Principal)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="font-medium text-gray-800">Análisis de Fotos</div>
              <div className="text-sm text-gray-600">GPT-4o-mini + Vision</div>
              <div className="text-lg font-bold text-blue-600">$0.05/análisis</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="font-medium text-gray-800">Coach Diario</div>
              <div className="text-sm text-gray-600">GPT-5-mini</div>
              <div className="text-lg font-bold text-blue-600">$0.02/mensaje</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="font-medium text-gray-800">Transcripción Voz</div>
              <div className="text-sm text-gray-600">Whisper API</div>
              <div className="text-lg font-bold text-blue-600">$0.006/minuto</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="font-semibold text-gray-800 mb-2">Coste Total Estimado por Usuario/Mes:</div>
            <div className="text-2xl font-bold text-yellow-700">$1.20 - $1.80</div>
            <div className="text-sm text-gray-600 mt-1">Base: $1.50/mes (se puede optimizar hasta $0.80)</div>
          </div>
        </div>
      </section>

      {/* Análisis por Fases */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">🚀 Análisis Financiero por Fases</h2>

        {/* Fase 1: 100 Usuarios */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 bg-blue-50 p-3 rounded">📈 FASE 1: 100 Usuarios (Meses 0-3)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$349</div>
              <div className="text-sm text-gray-600">Ingresos/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">$200</div>
              <div className="text-sm text-gray-600">Costes/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$149</div>
              <div className="text-sm text-gray-600">Beneficio/mes</div>
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
              <h4 className="font-semibold mb-2 text-gray-800">💸 Desglose Costes</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Supabase Pro: $25/mes</li>
                <li>• OpenAI API: $150/mes</li>
                <li>• Otros servicios: $25/mes</li>
                <li>• <strong>Total: $200/mes</strong></li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">📋 Necesidades en esta fase:</div>
            <ul className="text-sm mt-2 space-y-1 text-gray-700">
              <li>• 1 desarrollador (founder)</li>
              <li>• Configuración App Store/Play Store</li>
              <li>• Marketing orgánico (redes sociales)</li>
              <li>• Beta testing con usuarios</li>
            </ul>
          </div>
        </div>

        {/* Fase 2: 1,000 Usuarios */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 bg-green-50 p-3 rounded">📈 FASE 2: 1,000 Usuarios (Meses 4-12)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$3,490</div>
              <div className="text-sm text-gray-600">Ingresos/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">$1,649</div>
              <div className="text-sm text-gray-600">Costes/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$1,841</div>
              <div className="text-sm text-gray-600">Beneficio/mes</div>
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
              <h4 className="font-semibold mb-2 text-gray-800">💸 Desglose Costes</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Supabase Team: $99/mes</li>
                <li>• OpenAI API: $1,500/mes</li>
                <li>• Otros servicios: $50/mes</li>
                <li>• <strong>Total: $1,649/mes</strong></li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">📋 Necesidades en esta fase:</div>
            <ul className="text-sm mt-2 space-y-1 text-gray-700">
              <li>• Contratar 1 desarrollador adicional</li>
              <li>• Marketing digital ($500-1000/mes)</li>
              <li>• Atención al cliente</li>
              <li>• Optimizaciones de rendimiento</li>
            </ul>
          </div>
        </div>

        {/* Fase 3: 10,000 Usuarios */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 bg-orange-50 p-3 rounded">📈 FASE 3: 10,000 Usuarios (Año 2)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$34,900</div>
              <div className="text-sm text-gray-600">Ingresos/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">$17,799</div>
              <div className="text-sm text-gray-600">Costes/mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$17,101</div>
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
              <h4 className="font-semibold mb-2 text-gray-800">💸 Desglose Costes</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Supabase Enterprise: $599/mes</li>
                <li>• OpenAI API: $15,000/mes</li>
                <li>• Personal (3-5 personas): $2,000/mes</li>
                <li>• Infrastructure: $200/mes</li>
                <li>• <strong>Total: $17,799/mes</strong></li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">📋 Necesidades en esta fase:</div>
            <ul className="text-sm mt-2 space-y-1 text-gray-700">
              <li>• Equipo de 5 personas (2 dev, 1 marketing, 1 support, 1 producto)</li>
              <li>• Marketing pagado ($5,000-10,000/mes)</li>
              <li>• Optimización IA para reducir costes</li>
              <li>• Expansion internacional</li>
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
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">0-3M</div>
            <div className="flex-1">
              <div className="font-bold text-gray-800">Fase 1: MVP y Primeros Usuarios</div>
              <div className="text-sm text-gray-600">100 usuarios • $149/mes beneficio • Bootstrap</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">4-12M</div>
            <div className="flex-1">
              <div className="font-bold text-gray-800">Fase 2: Product-Market Fit</div>
              <div className="text-sm text-gray-600">1,000 usuarios • $1,841/mes beneficio • Primer empleado</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg border">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">1-2A</div>
            <div className="flex-1">
              <div className="font-bold text-gray-800">Fase 3: Scaling</div>
              <div className="text-sm text-gray-600">10,000 usuarios • $17,101/mes beneficio • Equipo 5 personas</div>
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