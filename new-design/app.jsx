import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Home, Users, FileText, Settings, Menu, X, Plus, Edit2, Trash2,
  Zap, DollarSign, Calendar, CheckCircle, XCircle, TrendingUp, Search
} from 'lucide-react';

const API_URL = window.location.origin + '/api';

// Componente Principal
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [residents, setResidents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [residentsRes, sessionsRes] = await Promise.all([
        fetch(`${API_URL}/residents`),
        fetch(`${API_URL}/sessions`)
      ]);
      const residentsData = await residentsRes.json();
      const sessionsData = await sessionsRes.json();
      setResidents(residentsData);
      setSessions(sessionsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'residents', label: 'Residentes', icon: Users },
    { id: 'sessions', label: 'Sessões', icon: FileText },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header Mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-stone-900">Chácaras</h1>
              <p className="text-xs text-stone-500">Energy Manager</p>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-stone-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r border-stone-200 flex-col shadow-xl">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Chácaras</h1>
              <p className="text-sm text-stone-500">Energy Manager</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                    ${isActive 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' 
                      : 'text-stone-600 hover:bg-stone-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-stone-200">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
            <p className="text-sm font-semibold text-amber-900 mb-1">Sistema Ativo</p>
            <p className="text-xs text-amber-700">Gerenciando energia com eficiência</p>
          </div>
        </div>
      </aside>

      {/* Menu Mobile Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-0 left-0 h-screen w-80 bg-white z-50 shadow-2xl animate-slide-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-stone-900">Chácaras</h2>
                    <p className="text-sm text-stone-500">Energy Manager</p>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                        ${isActive 
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' 
                          : 'text-stone-600 hover:bg-stone-50'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="lg:ml-72 pt-20 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard residents={residents} sessions={sessions} />}
          {activeTab === 'residents' && <Residents residents={residents} onUpdate={loadData} />}
          {activeTab === 'sessions' && <Sessions sessions={sessions} residents={residents} onUpdate={loadData} />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
}

// Dashboard Component
function Dashboard({ residents, sessions }) {
  const activeSession = sessions.find(s => s.status === 'active');
  const totalResidents = residents.length;
  const totalPaid = activeSession?.readings.filter(r => r.paid).length || 0;
  const totalRevenue = activeSession?.readings.reduce((sum, r) => sum + (r.paid ? r.total : 0), 0) || 0;

  const stats = [
    { label: 'Residentes', value: totalResidents, icon: Users, color: 'from-blue-600 to-blue-700' },
    { label: 'Pagamentos', value: `${totalPaid}/${totalResidents}`, icon: CheckCircle, color: 'from-emerald-600 to-emerald-700' },
    { label: 'Receita Atual', value: `R$ ${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'from-amber-600 to-amber-700' },
    { label: 'Sessões', value: sessions.length, icon: FileText, color: 'from-purple-600 to-purple-700' }
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-2">Dashboard</h2>
        <p className="text-stone-600">Visão geral do sistema de gerenciamento</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i}
              className="card-elegant p-6 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-stone-900 mb-1">{stat.value}</p>
              <p className="text-sm text-stone-500 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {activeSession && (
        <div className="card-elegant p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-1">Sessão Ativa</h3>
              <p className="text-stone-600">{activeSession.config.month}/{activeSession.config.year}</p>
            </div>
            <span className="badge-elegant">
              <TrendingUp className="w-4 h-4 mr-1" />
              Ativa
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <p className="text-sm text-stone-600 mb-1">Valor Total</p>
              <p className="text-xl font-bold text-stone-900">R$ {activeSession.config.totalBillAmount?.toFixed(2)}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <p className="text-sm text-stone-600 mb-1">kWh Master</p>
              <p className="text-xl font-bold text-stone-900">{activeSession.config.totalKwhMaster}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <p className="text-sm text-stone-600 mb-1">Preço kWh</p>
              <p className="text-xl font-bold text-stone-900">R$ {activeSession.config.kwhPrice?.toFixed(2)}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <p className="text-sm text-stone-600 mb-1">Manutenção</p>
              <p className="text-xl font-bold text-stone-900">R$ {activeSession.config.maintenanceFee?.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Residents Component
function Residents({ residents, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [editingResident, setEditingResident] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResidents = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.lot.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingResident(null);
    setShowModal(true);
  };

  const handleEdit = (resident) => {
    setEditingResident(resident);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este residente?')) return;
    try {
      await fetch(`${API_URL}/residents?id=${id}`, { method: 'DELETE' });
      onUpdate();
    } catch (error) {
      alert('Erro ao deletar residente');
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-2">Residentes</h2>
          <p className="text-stone-600">Gerencie os moradores das chácaras</p>
        </div>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus className="w-5 h-5" />
          Novo Residente
        </button>
      </div>

      <div className="card-elegant p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou lote..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-elegant w-full pl-12"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredResidents.map((resident, i) => (
          <div 
            key={resident._id}
            className="card-elegant p-6 animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-stone-900 mb-1">{resident.name}</h3>
                <p className="text-stone-600 font-medium">Lote {resident.lot}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(resident)}
                  className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-stone-600" />
                </button>
                <button
                  onClick={() => handleDelete(resident._id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-stone-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-600">Última Leitura</span>
                <span className="font-semibold text-stone-900">{resident.lastReading} kWh</span>
              </div>
              {resident.exemptWellFee && (
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  Isento Taxa Poço
                </span>
              )}
              {resident.exemptStreetFee && (
                <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium ml-2">
                  Isento Taxa Rua
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ResidentModal
          resident={editingResident}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            onUpdate();
          }}
        />
      )}
    </div>
  );
}

// Modal de Residente
function ResidentModal({ resident, onClose, onSave }) {
  const [formData, setFormData] = useState({
    lot: resident?.lot || '',
    name: resident?.name || '',
    lastReading: resident?.lastReading || 0,
    exemptWellFee: resident?.exemptWellFee || false,
    exemptStreetFee: resident?.exemptStreetFee || false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = resident 
        ? `${API_URL}/residents?id=${resident._id}`
        : `${API_URL}/residents`;
      const method = resident ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      onSave();
    } catch (error) {
      alert('Erro ao salvar residente');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-stone-200">
          <h3 className="text-2xl font-bold text-stone-900">
            {resident ? 'Editar Residente' : 'Novo Residente'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Lote</label>
            <input
              type="text"
              value={formData.lot}
              onChange={(e) => setFormData({ ...formData, lot: e.target.value })}
              className="input-elegant w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-elegant w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Última Leitura (kWh)</label>
            <input
              type="number"
              value={formData.lastReading}
              onChange={(e) => setFormData({ ...formData, lastReading: parseFloat(e.target.value) })}
              className="input-elegant w-full"
              required
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-stone-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.exemptWellFee}
                onChange={(e) => setFormData({ ...formData, exemptWellFee: e.target.checked })}
                className="w-5 h-5 rounded accent-emerald-600"
              />
              <span className="text-sm font-medium text-stone-700">Isento de Taxa do Poço</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.exemptStreetFee}
                onChange={(e) => setFormData({ ...formData, exemptStreetFee: e.target.checked })}
                className="w-5 h-5 rounded accent-emerald-600"
              />
              <span className="text-sm font-medium text-stone-700">Isento de Taxa da Rua</span>
            </label>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-stone-300 rounded-xl font-medium hover:bg-stone-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Sessions Component (simplificado)
function Sessions({ sessions, residents, onUpdate }) {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-2">Sessões de Cobrança</h2>
        <p className="text-stone-600">Gerencie as sessões de cobrança mensal</p>
      </div>

      <div className="grid gap-4">
        {sessions.map((session, i) => (
          <div 
            key={session._id}
            className="card-elegant p-6 animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-1">
                  {session.config.month}/{session.config.year}
                </h3>
                <p className="text-stone-600">
                  {session.readings.length} leituras • R$ {session.config.totalBillAmount?.toFixed(2)}
                </p>
              </div>
              <span className={`badge-elegant ${session.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-700'}`}>
                {session.status === 'active' ? 'Ativa' : 'Fechada'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings Component
function Settings() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-2">Configurações</h2>
        <p className="text-stone-600">Configure as preferências do sistema</p>
      </div>

      <div className="card-elegant p-8 text-center">
        <Settings className="w-16 h-16 text-stone-400 mx-auto mb-4" />
        <p className="text-stone-600">Configurações em desenvolvimento</p>
      </div>
    </div>
  );
}

// Renderizar App
const root = createRoot(document.getElementById('root'));
root.render(<App />);
