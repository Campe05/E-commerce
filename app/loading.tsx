import Image from 'next/image'

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_99percent-uzPludLQQqzrh2i8Ezvjj9w2T9HD7N.png"
          alt="99 Percent Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  )
}

