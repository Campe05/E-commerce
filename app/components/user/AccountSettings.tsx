import { useLanguage } from '../../contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface User {
  firstName: string
  lastName: string
  email: string
  birthDate: string
}

interface AccountSettingsProps {
  user: User
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const { language } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar la información del usuario
    console.log('Datos actualizados:', user)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {language === 'ES' ? 'Configuración de la Cuenta' : 'Account Settings'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            {language === 'ES' ? 'Nombre' : 'First Name'}
          </label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={user.firstName}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            {language === 'ES' ? 'Apellidos' : 'Last Name'}
          </label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={user.lastName}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {language === 'ES' ? 'Correo Electrónico' : 'Email'}
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email}
            required
          />
        </div>
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
            {language === 'ES' ? 'Fecha de Nacimiento' : 'Birth Date'}
          </label>
          <Input
            type="date"
            id="birthDate"
            name="birthDate"
            defaultValue={user.birthDate}
            required
          />
        </div>
        <Button type="submit">
          {language === 'ES' ? 'Guardar Cambios' : 'Save Changes'}
        </Button>
      </form>
    </div>
  )
}

