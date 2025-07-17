import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany() // Limpiar productos previos

  await prisma.product.createMany({
    data: [
      {
        name: "Cable HDMI 2.0 2m",
        description: "Cable HDMI de alta velocidad, 2 metros, compatible 4K.",
        type: "HDMI",
        price: 8.99,
        image: "/placeholder-hdmi.jpg",
        stock: 50,
      },
      {
        name: "Cable USB-C a USB-A 1m",
        description: "Cable de carga y datos USB-C a USB-A, 1 metro.",
        type: "USB",
        price: 4.99,
        image: "/placeholder-usbc.jpg",
        stock: 100,
      },
      {
        name: "Cable Lightning 1m",
        description: "Cable para iPhone/iPad certificado MFi, 1 metro.",
        type: "Lightning",
        price: 9.99,
        image: "/placeholder-lightning.jpg",
        stock: 80,
      },
      {
        name: "Cable de red Cat6 5m",
        description: "Cable Ethernet Cat6, 5 metros, alta velocidad.",
        type: "Ethernet",
        price: 6.49,
        image: "/placeholder-cat6.jpg",
        stock: 60,
      },
      {
        name: "Cable VGA 1.5m",
        description: "Cable VGA macho-macho, 1.5 metros.",
        type: "VGA",
        price: 5.99,
        image: "/placeholder-vga.jpg",
        stock: 40,
      },
      {
        name: "Cable Jack 3.5mm 1m",
        description: "Cable de audio estéreo 3.5mm, 1 metro.",
        type: "Audio",
        price: 3.99,
        image: "/placeholder-jack.jpg",
        stock: 120,
      },
      {
        name: "Cable USB-C a USB-C 2m",
        description: "Cable de carga rápida USB-C a USB-C, 2 metros.",
        type: "USB",
        price: 7.99,
        image: "/placeholder-usbc2.jpg",
        stock: 70,
      },
      {
        name: "Cable DisplayPort 1.4 1.8m",
        description: "Cable DisplayPort 1.4, 1.8 metros, soporte 8K.",
        type: "DisplayPort",
        price: 12.99,
        image: "/placeholder-dp.jpg",
        stock: 30,
      },
      {
        name: "Cable Micro USB 1m",
        description: "Cable Micro USB para carga y datos, 1 metro.",
        type: "USB",
        price: 2.99,
        image: "/placeholder-microusb.jpg",
        stock: 90,
      },
      {
        name: "Cable RCA 3 en 1",
        description: "Cable de audio y video RCA, 3 conectores.",
        type: "RCA",
        price: 5.49,
        image: "/placeholder-rca.jpg",
        stock: 35,
      },
      {
        name: "Cable de impresora USB-B 1.5m",
        description: "Cable USB-A a USB-B para impresoras, 1.5 metros.",
        type: "USB",
        price: 4.49,
        image: "/placeholder-usbb.jpg",
        stock: 55,
      },
      {
        name: "Cable SATA 50cm",
        description: "Cable de datos SATA para discos duros, 50cm.",
        type: "SATA",
        price: 2.49,
        image: "/placeholder-sata.jpg",
        stock: 75,
      },
      {
        name: "Cable de poder PC 1.8m",
        description: "Cable de alimentación para PC, 1.8 metros.",
        type: "Poder",
        price: 6.99,
        image: "/placeholder-power.jpg",
        stock: 45,
      },
      {
        name: "Cable coaxial 3m",
        description: "Cable coaxial para TV, 3 metros.",
        type: "Coaxial",
        price: 4.99,
        image: "/placeholder-coaxial.jpg",
        stock: 65,
      },
      {
        name: "Cable Mini DisplayPort 1m",
        description: "Cable Mini DisplayPort a DisplayPort, 1 metro.",
        type: "DisplayPort",
        price: 10.99,
        image: "/placeholder-minidp.jpg",
        stock: 25,
      },
      {
        name: "Cable USB OTG 20cm",
        description: "Cable adaptador USB OTG, 20cm.",
        type: "USB",
        price: 3.49,
        image: "/placeholder-otg.jpg",
        stock: 85,
      },
      {
        name: "Cable de audio óptico 1.5m",
        description: "Cable Toslink óptico digital, 1.5 metros.",
        type: "Óptico",
        price: 8.49,
        image: "/placeholder-optico.jpg",
        stock: 38,
      },
      {
        name: "Cable de extensión USB 3.0 1m",
        description: "Cable extensor USB 3.0, 1 metro.",
        type: "USB",
        price: 5.99,
        image: "/placeholder-usbext.jpg",
        stock: 60,
      },
      {
        name: "Cable paralelo 1.8m",
        description: "Cable paralelo para impresoras antiguas, 1.8 metros.",
        type: "Paralelo",
        price: 7.49,
        image: "/placeholder-paralelo.jpg",
        stock: 20,
      },
      {
        name: "Cable splitter de audio 3.5mm",
        description: "Cable divisor de audio estéreo 3.5mm.",
        type: "Audio",
        price: 2.99,
        image: "/placeholder-splitter.jpg",
        stock: 110,
      },
    ],
  })

  console.log("Productos de ejemplo insertados para Volteo 🚀")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 