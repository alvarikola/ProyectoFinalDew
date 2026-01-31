// Crear aplicación Vue para el footer
const footerApp = Vue.createApp({
  template: '<footer-tienda />'
});

footerApp.component('footer-tienda', {
  data() {
    return {
      nombreEmpresa: 'TiendaDewAlvaro',
      año: new Date().getFullYear(),
      direccion: 'Calle Apruebame 123, Lanzarote, Canarias',
      correo: 'contacto@tiendadew.com',
      telefono: '+34 912 345 678',
      mostrarContacto: true,     // v-if
      redesSociales: [
        { nombre: 'Facebook', url: '#' },
        { nombre: 'Instagram', url: '#' },
        { nombre: 'Twitter', url: '#' }
      ],
      estilos: {
        footer: {
          backgroundColor: '#333',
          color: '#fff',
          padding: '40px 20px',
          marginTop: '50px',
          width: '100%',
          boxSizing: 'border-box',
          overflowX: 'hidden' // evita scroll horizontal
        },
        contenido: {
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '20px',
          boxSizing: 'border-box'
        },
        columna: {
          flex: '1 1 250px', // flexible y responsive
          minWidth: '0'
        },
        titulo: {
          margin: '0 0 15px 0',
          fontSize: '24px',
          color: '#fff'
        },
        subtitulo: {
          margin: '0 0 15px 0',
          fontSize: '18px',
          color: '#ffc107'
        },
        parrafo: {
          margin: '8px 0',
          lineHeight: '1.6',
          color: '#ddd'
        },
        enlace: {
          color: '#ffc107',
          textDecoration: 'none'
        },
        redesSociales: {
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }
      }
    }
  },

  computed: {
    // Propiedad calculada
    textoCopyright() {
      return `© ${this.año} ${this.nombreEmpresa}. Todos los derechos reservados.`;
    }
  },

  methods: {
    // Evento con método
    toggleContacto() {
      this.mostrarContacto = !this.mostrarContacto;
    }
  },

  template: `
    <footer :style="estilos.footer">
      <div :style="estilos.contenido">

        <!-- Empresa y copyright -->
        <div :style="estilos.columna">
          <h3 :style="estilos.titulo">{{ nombreEmpresa }}</h3>
          <p :style="estilos.parrafo">{{ textoCopyright }}</p>
          <button @click="toggleContacto">
            Mostrar / Ocultar contacto
          </button>
        </div>

        <!-- Contacto (v-if) -->
        <div :style="estilos.columna" v-if="mostrarContacto">
          <h4 :style="estilos.subtitulo">Contacto</h4>
          <p :style="estilos.parrafo"><strong>Dirección:</strong> {{ direccion }}</p>
          <p :style="estilos.parrafo">
            <strong>Email:</strong>
            <a :href="'mailto:' + correo" :style="estilos.enlace">{{ correo }}</a>
          </p>
          <p :style="estilos.parrafo">
            <strong>Teléfono:</strong>
            <a :href="'tel:' + telefono" :style="estilos.enlace">{{ telefono }}</a>
          </p>
        </div>

        <!-- Redes sociales (v-for) -->
        <div :style="estilos.columna">
          <h4 :style="estilos.subtitulo">Síguenos</h4>
          <div :style="estilos.redesSociales">
            <a
              v-for="red in redesSociales"
              :key="red.nombre"
              :href="red.url"
              :style="estilos.enlace"
            >
              {{ red.nombre }}
            </a>
          </div>
        </div>

      </div>
    </footer>
  `
});

// Montar la app
footerApp.mount('#footer-app');
