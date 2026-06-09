// Base de datos oficial de Reclamos Bitel y Regulaciones OSIPTEL
// Toda la información proviene estrictamente de los documentos provistos.

const CLAIMS_DATA = {
  basicConcepts: {
    definition: "Es una manifestación por la cual el titular del servicio (abonado) da a conocer su malestar con los servicios públicos de telecomunicaciones, basándose en una serie de materias contempladas y reguladas por OSIPTEL (Artículo 28° del TUO del Reglamento de Reclamos).",
    properties: [
      "Es un Proceso Administrativo, ya que no interviene la vía judicial (Artículo 5° y 6° del TUO de Reclamos).",
      "No necesita de un abogado.",
      "Es completamente gratis y sin condiciones."
    ],
    requirements: {
      title: "Requisitos para presentar un reclamo (Artículo 52° del TUO)",
      general: [
        { num: 1, text: "Nombres y apellidos completos del usuario o razón social de ser el caso (Datos del abonado una vez efectuada la acreditación)." },
        { num: 2, text: "Número del documento legal de identificación (DNI, C.E., PASAPORTE, RUC). En caso de representante, se requiere adicionalmente sus datos y el poder correspondiente (conforme a Art. 26 y 27). *Nota: Para clientes RUC o representantes, la presentación será vía Centro de Atención Bitel (CAB)." },
        { num: 3, text: "Servicio objeto del reclamo." },
        { num: 4, text: "Número o código del servicio o del contrato de abonado." },
        { num: 5, text: "Motivo del reclamo y solicitud concreta (hecho específico y solicitud ante el problema presentado)." },
        { num: 6, text: "Firma del usuario o del representante (solo aplica para presentación escrita/presencial)." },
        { num: 7, text: "Para reclamos de montos de recibo: Fecha o mes de emisión/vencimiento, o el número del recibo cuestionado. *Requisito indispensable para registrar el reclamo. La suspensión del importe reclamado se realiza según el Art. 30 del TUO.", critical: true },
        { num: 8, text: "Datos para notificación: Correo electrónico válido autorizado. Si no se especifica que la notificación sea física, se considerará notificación electrónica al correo registrado."
        }
      ],
      note: "Tener en cuenta que así falte algún requisito (excepto el del recibo en caso de montos), de igual forma se tiene que registrar el reclamo."
    },
    presentationForms: [
      {
        id: "telefonico",
        name: "Vía Telefónica (Art. 53.1)",
        details: [
          "El agente debe leer al usuario el contenido del formulario (materia, detalle del motivo, monto/recibo reclamado) y obtener su conformidad respecto a lo registrado.",
          "El agente debe proporcionar el código de reclamo e informar el plazo máximo para resolver en primera instancia.",
          "Debe remitir el formulario registrado por correo electrónico o, en su defecto, por SMS con la materia, código de reclamo y enlace al expediente virtual (Constancia de presentación).",
          "IMPORTANTE: En llamadas de reclamos, apelaciones o quejas se debe grabar la comunicación, informando al usuario. Se debe elevar el audio íntegro a requerimiento de TRASU."
        ]
      },
      {
        id: "personal",
        name: "Vía Personal / Presencial (Art. 53.2)",
        details: [
          "La empresa operadora debe llenar el formulario digital correspondiente de acuerdo al formato de OSIPTEL.",
          "Se debe entregar el formulario impreso al usuario de forma inmediata.",
          "El documento debe contener obligatoriamente: fecha y hora de presentación, nombre y apellidos de la persona que lo atendió, sello de recepción de la empresa y código de reclamo.",
          "El usuario puede exigir modificaciones si el formulario no registra exactamente lo expresado."
        ]
      },
      {
        id: "escrito",
        name: "Vía Escrito (Art. 53.3)",
        details: [
          "El usuario presenta el escrito en original y copia.",
          "En la copia (única constancia de presentación) se debe consignar: fecha y hora, nombre de quien recibió, sello de recepción y código de reclamo.",
          "Se puede usar el formulario aprobado por OSIPTEL, pero la empresa no puede obligar a usarlo.",
          "No se puede limitar la entrega por parte de una tercera persona que actúe únicamente para entregar el escrito y obtener el cargo."
        ]
      },
      {
        id: "web",
        name: "Página Web o Aplicativo (Art. 53.4)",
        details: [
          "Mecanismo en línea disponible las 24 horas del día en la página web principal o app móvil.",
          "Debe permitir reclamos de servicios asociados al titular del aplicativo.",
          "Debe requerir toda la información de los formularios digitales de OSIPTEL e informar sobre la notificación electrónica.",
          "Proporcionar de forma inmediata un ejemplar del formulario con el código de reclamo como constancia al correo electrónico indicado."
        ]
      },
      {
        id: "sgu",
        name: "Sistema de Gestión de Usuarios - SGU (Art. 53.5)",
        details: [
          "Permite presentar reclamos cuando venza el plazo de atención de gestiones previas sin respuesta, o cuando el usuario esté disconforme con la atención y el problema corresponda a una materia reclamable.",
          "IMPORTANTE: En todos los canales, al presentar el reclamo, se debe informar al usuario sobre su derecho a acceder al expediente, el plazo máximo de resolución, su clave secreta y el enlace al expediente virtual."
        ]
      }
    ],
    stages: {
      title: "Etapas del Procedimiento Administrativo",
      firstInstance: {
        name: "Primera Instancia (Art. 22)",
        body: "La empresa operadora (Bitel) es el órgano competente de resolución en primera instancia administrativa de los reclamos de los usuarios."
      },
      secondInstance: {
        name: "Segunda Instancia (Art. 24)",
        body: "El TRASU (Tribunal Administrativo de Solución de Reclamos a Usuarios) de OSIPTEL es el órgano de resolución en segunda instancia administrativa de los reclamos. También conoce las quejas presentadas por los usuarios."
      }
    },
    prohibitions: [
      "Impedir o negar la presentación de reclamos, recursos y quejas bajo cualquiera de las formas del reglamento.",
      "Emitir opinión previa con relación al resultado del procedimiento.",
      "Impedir o negar el acceso al expediente si el usuario lo solicita.",
      "Omitir proporcionar al usuario el código o número de reclamo/recurso/queja al momento de la presentación o solicitud.",
      "Omitir brindar información sobre la ubicación del expediente y estado del trámite.",
      "Omitir expedir copias simples o certificadas del expediente solicitadas por el usuario (según Art. 10).",
      "Impedir y/o negar la autorización al usuario del pago de la parte no reclamada del recibo."
    ]
  },

  materias: [
    {
      id: 1,
      nombre: "Facturación y Cobro",
      definicion: "Comprende el desacuerdo del usuario con los montos que figuran en el recibo emitido o los requerimientos de pago del servicio.",
      submotivos: [
        "El cálculo de los consumos facturados (cuando la sumatoria total no corresponde).",
        "La tarifa aplicada de consumos adicionales facturados (disconformidad con la tarifa aplicada por consumo realizado).",
        "El cargo por reconexión (cobro por el cargo de reconexión).",
        "Otro monto correspondiente a cualquier concepto facturado cuyo consumo se desconoce (monto por reconexión, roaming, datos móviles adicionales, servicios adicionales, etc.).",
        "Pagos no procesados o registrados (el cliente pagó pero no se verifica en el sistema).",
        "Montos no facturados oportunamente (importes asociados a notas de débito no incluidos en el recibo).",
        "Cobros de equipos terminales incluidos en el recibo (desacuerdo en monto o por reintegro de descuento vinculado a la permanencia).",
        "La aplicación de incremento tarifario no comunicado previamente (recibos emitidos hasta 2 meses desde el vencimiento del primer recibo con el incremento)."
      ],
      ejemplos: [
        "Cliente adquiere una línea de S/29.90 y todos los meses le viene S/32.00 en su factura.",
        "Cliente desconoce o está en desacuerdo con el cobro de algún paquete adicional facturado."
      ]
    },
    {
      id: 2,
      nombre: "Calidad o Idoneidad en la Prestación del Servicio",
      definicion: "Problemas derivados de una inadecuada prestación del servicio técnico u operativo.",
      submotivos: [
        "Inconvenientes con casilla de voz.",
        "No realiza o recibe llamadas.",
        "Envío o recepción de SMS.",
        "Problemas de señal o cobertura.",
        "Intermitencia del servicio.",
        "Lentitud en el servicio de datos.",
        "Comunicaciones entrecortadas o con ruido."
      ],
      ejemplos: [
        "Problemas constantes para realizar llamadas, enviar mensajes o navegar por internet."
      ]
    },
    {
      id: 3,
      nombre: "Incumplimiento de Condiciones Contractuales, Ofertas y Promociones",
      definicion: "Aplicación de tarifas o condiciones distintas a las pactadas, ofertas no aplicadas o falta de información sobre características del servicio.",
      submotivos: [
        "Aplicación de condiciones y tarifas distintas a las pactadas en el contrato (salvo modificaciones más beneficiosas).",
        "Incumplimiento de ofertas o promociones ofrecidas y/o contratadas.",
        "Descuentos no reconocidos de los atributos y/o beneficios del plan, oferta o promoción.",
        "Omisión de información o información inexacta sobre la cobertura u otras características/limitaciones del servicio."
      ],
      ejemplos: [
        "El cliente cumple con las condiciones de una promoción de saldo doble pero no se le aplica.",
        "No aplicación de los beneficios por activación o promoción vigente.",
        "Omisión de información sobre las condiciones del producto adquirido."
      ]
    },
    {
      id: 4,
      nombre: "Falta de Servicio",
      definicion: "Problemas relacionados con cortes injustificados de la línea, falta de reactivación tras el pago o modificaciones no autorizadas en la titularidad.",
      submotivos: [
        "Interrupción, suspensión, corte o baja injustificada del servicio (o sin observar el procedimiento normativo vigente).",
        "Suspensión del servicio por uso prohibido en establecimientos penitenciarios.",
        "Falta de reactivación del servicio pese al pago del recibo.",
        "Cambio de titularidad del servicio o reposición de SIM card sin consentimiento del abonado."
      ],
      ejemplos: [
        "Cliente paga su deuda pero la línea no se reactiva.",
        "Línea suspendida injustificadamente. *Nota: No aplica para suspensión derivada del bloqueo de equipo."
      ]
    },
    {
      id: 5,
      nombre: "Instalación, Activación o Traslado del Servicio",
      definicion: "Falta de ejecución de los servicios solicitados o falta de devolución de importes por servicios no ejecutados.",
      submotivos: [
        "Falta de instalación del servicio fijo solicitado.",
        "Falta de activación del servicio móvil o de paquetes asociados.",
        "Falta de traslado del servicio (aplica solo para servicios alámbricos como FTTH).",
        "Falta de respuesta a la solicitud de traslado o negativa injustificada al mismo.",
        "Falta de devolución de montos cobrados por instalación, activación o traslado no ejecutados."
      ],
      ejemplos: [
        "El cliente solicita instalación de FTTH, pasa la fecha acordada y no se realiza el servicio.",
        "No devolución del costo de instalación cobrado previamente de un servicio no instalado."
      ]
    },
    {
      id: 6,
      nombre: "Falta de Ejecución de Baja o Suspensión del Servicio",
      definicion: "Problemas con solicitudes de cancelación o suspensión temporal que no se ejecutan y generan cobros posteriores.",
      submotivos: [
        "Falta de ejecución de la baja de la línea solicitada.",
        "Falta de ejecución de la suspensión temporal del servicio.",
        "Cobro de montos posteriores a la fecha en que se efectuó la baja o correspondía efectuarla.",
        "Cobro de montos posteriores a la fecha en que se efectuó la suspensión temporal o correspondía efectuarla."
      ],
      ejemplos: [
        "El cliente solicitó la baja del servicio pero la empresa sigue emitiendo recibos mensuales."
      ]
    },
    {
      id: 7,
      nombre: "Recargas",
      definicion: "Problemas relacionados con recargas de saldo o atributos prepago.",
      submotivos: [
        "Falta de asignación de saldo o atributos de la recarga realizada.",
        "Descuentos indebidos del saldo o del crédito.",
        "Afiliación a paquetes de adquisición de tráfico u otros promocionales no solicitados que impliquen un descuento del saldo."
      ],
      ejemplos: [
        "El cliente realiza una recarga de S/10.00 en un agente autorizado pero el saldo nunca se acredita.",
        "Se le debita saldo por un paquete de internet que el cliente nunca autorizó ni activó."
      ]
    },
    {
      id: 8,
      nombre: "Contratación No Solicitada",
      definicion: "Desconocimiento por parte del abonado de la contratación de un servicio principal, adicional o adquisición de equipos.",
      submotivos: [
        "Desconocimiento de la contratación del servicio principal (prepago o postpago).",
        "Desconocimiento de la contratación de servicios adicionales o suplementarios (servicios de valor agregado - VAS).",
        "Desconocimiento de adquisición de paquetes de tráfico o señales de programación.",
        "Desconocimiento de contrato de adquisición o financiamiento de equipo terminal cuyo pago se incluye en el recibo."
      ],
      ejemplos: [
        "Cliente encuentra en su recibo cargos por financiamiento de un celular que no ha comprado ni solicitado."
      ]
    },
    {
      id: 9,
      nombre: "Migración",
      definicion: "Problemas con el cambio de plan tarifario (condicionamiento, plazos, facturación errónea o cambios no solicitados).",
      submotivos: [
        "Condicionamiento, negativa o falta de respuesta a la solicitud de migración de plan.",
        "Falta de ejecución de la migración dentro del plazo establecido.",
        "Facturación que corresponde al plan anterior después de realizada la migración.",
        "Migración de plan no solicitada o autorizada por el cliente."
      ],
      ejemplos: [
        "Se solicita migración a un plan menor, no se ejecuta y se sigue cobrando la renta del plan caro.",
        "Cambio de plan realizado sin consentimiento."
      ]
    },
    {
      id: 10,
      nombre: "Portabilidad",
      definicion: "Problemas en el trámite de transferencia de número telefónico desde o hacia otra operadora.",
      submotivos: [
        "Negativa a recibir la solicitud de portabilidad del número.",
        "Rechazo injustificado a la solicitud de portabilidad.",
        "Falta de entrega de información obligatoria sobre el estado de la portabilidad.",
        "Falta de consentimiento del abonado para efectuar el proceso de portabilidad.",
        "Falta de cobertura del servicio tras completarse la portabilidad.",
        "Falta de retorno del número telefónico (cuando hay resolución firme que ordena el retorno y no se ejecuta)."
      ],
      ejemplos: [
        "Bitel rechaza la portabilidad de una línea prepago sin causa válida.",
        "Se realiza la portabilidad a Bitel pero la línea se queda sin señal/cobertura indefinidamente."
      ]
    },
    {
      id: 11,
      nombre: "Otras Materias Reclamables",
      definicion: "Cualquier otra materia que la ley de telecomunicaciones contemple de manera taxativa.",
      submotivos: [
        "Negativa de la operadora a contratar el servicio con el usuario.",
        "Falta de entrega de recibos (físicos o electrónicos).",
        "Negativa a brindar la facturación detallada (detalle de consumos) o el registro de llamadas entrantes."
      ],
      ejemplos: [
        "El cliente solicita su recibo mensual en físico o por correo y la empresa no se lo envía.",
        "El cliente solicita el reporte de llamadas entrantes o salientes y se le deniega el acceso."
      ]
    }
  ],

  resolutions: {
    types: [
      { name: "FUNDADO", desc: "Cuando el cliente tiene la razón o fundamento en cuanto a la materia reclamada." },
      { name: "INFUNDADO", desc: "Cuando el cliente no tiene la razón o fundamento en cuanto a la materia reclamada." },
      { name: "PARCIALMENTE FUNDADO", desc: "Cuando el cliente tiene parte de la razón por el concepto reclamado." },
      { name: "INADMISIBLE", desc: "Cuando no se cumplen con todos los requisitos necesarios para la presentación del reclamo (Art. 31: se otorga plazo de 3 días hábiles para que subsane el error, suspendiendo el plazo de resolución. Si no se subsana, se archiva el expediente)." },
      { name: "IMPROCEDENTE", desc: "Se declara improcedente (Art. 32) cuando se presenta fuera de los plazos establecidos, el objeto no es una materia reclamable, o ya existe un procedimiento en trámite/resolución firme sobre el mismo objeto." }
    ],
    motivation: {
      title: "Motivación de Resoluciones (Art. 33)",
      requirements: [
        "Deben encontrarse debidamente motivadas, incluyendo expresamente los hechos relevantes y su relación con los medios probatorios actuados, así como su correspondiente valoración.",
        "Señalar expresamente las normas legales aplicadas (indicando artículos específicos).",
        "Ser suscritas por los funcionarios responsables."
      ]
    },
    probatoryAction: {
      title: "Actuación de Medios Probatorios (Art. 57)",
      details: [
        "El órgano de primera instancia inicia la investigación disponiendo de oficio los medios probatorios aprobados por el TRASU.",
        "Los resultados de las pruebas e informes sustentatorios deben anexarse al expediente y estar a disposición del usuario.",
        "Se pueden solicitar pruebas a otras operadoras (quienes están obligadas a brindarlas).",
        "En ningún caso el costo de obtener los medios probatorios se traslada al usuario."
      ]
    },
    presentationLimits: {
      title: "Plazos de Presentación de Reclamos (Art. 55)",
      rules: [
        { type: "Facturación y Cobro", text: "Hasta un (1) año después de la fecha de vencimiento del recibo con el cobro en disputa; o hasta un (1) año después de requerido el cobro o de notificado el documento de deuda." },
        { type: "Demás casos", text: "En tanto subsista el hecho que motiva el reclamo." },
        { type: "Vencimiento", text: "Una vez vencidos los plazos de presentación, el usuario puede recurrir directamente a la vía judicial o arbitral." }
      ]
    },
    periods: [
      {
        id: "3_days",
        resolutionDays: 3,
        notificationDays: 5,
        title: "Resolución Corta (3 días útiles)",
        materias: [
          "Calidad o Idoneidad en la Prestación del Servicio",
          "Falta de Servicio",
          "Falta de Ejecución de Baja o Suspensión del Servicio",
          "Portabilidad",
          "Otras Materias Reclamables: Falta de entrega de recibos",
          "Otras Materias Reclamables: Negativa a brindar la facturación detallada o llamadas entrantes"
        ]
      },
      {
        id: "15_days",
        resolutionDays: 15,
        notificationDays: 5,
        title: "Resolución Media (15 días útiles)",
        materias: [
          "Facturación y Cobro (con monto de deuda menor o igual a 0.5 UIT - S/ 2575.00)",
          "Recargas",
          "Instalación, Activación o Traslado del Servicio"
        ]
      },
      {
        id: "20_days",
        resolutionDays: 20,
        notificationDays: 5,
        title: "Resolución Ordinaria (20 días útiles)",
        materias: [
          "Facturación y Cobro (con monto de deuda mayor a 0.5 UIT - S/ 2575.00)",
          "Incumplimiento de Condiciones Contractuales, Ofertas y Promociones",
          "Contratación No Solicitada",
          "Migración",
          "Otras Materias Reclamables: Negativa a contratar el servicio"
        ]
      }
    ],
    uit2024: 5150.00
  },

  mediosProbatorios: [
    { id: 1, concepto: "Facturación y Cobro: Cálculo de los conceptos facturables registrados", materiaId: 1, servicios: ["Telefonía Fija", "LDI-Fija", "LDN"], medios: ["Boleta de consumos por cobro revertido", "Detalle de consumo", "Histórico de cortes y reactivaciones", "Informe de investigación de llamadas", "Inspección técnica", "Promedio de consumo", "Recibo", "Registro de problemas de calidad y averías"] },
    { id: 2, concepto: "Facturación y Cobro: Cálculo de los conceptos facturables registrados", materiaId: 1, servicios: ["Servicio Móvil Postpago", "Internet Móvil", "LDI-Servicio Móvil", "LDN"], medios: ["Boleta de consumos por cobro revertido", "Detalle de consumos", "Detalle desagregado, valorizado y totalizado por cada modalidad o tipo de consumo del periodo reclamado", "Histórico de cortes y reactivaciones", "Registro de problemas de calidad y averías", "Recibo", "Informe de investigación de llamadas"] },
    { id: 3, concepto: "Facturación y Cobro: Tarifa aplicada a consumos adicionales", materiaId: 1, servicios: ["Telefonía Fija", "Servicio Móvil Postpago", "Internet Móvil", "LDI-Fija", "LDI-Servicio Móvil", "LDN"], medios: ["Histórico de pedidos", "Mecanismo de contratación", "Recibo"] },
    { id: 4, concepto: "Facturación y Cobro: Cargo por reconexión", materiaId: 1, servicios: ["Telefonía Fija", "Televisión de Paga", "Internet de Acceso Fijo", "Servicio Móvil Postpago", "Internet Móvil"], medios: ["Constancia de pago", "Histórico de cortes y reactivaciones", "Histórico de estado de cuenta", "Histórico de reclamos", "Informe de recaudación de pagos", "Recibo"] },
    { id: 5, concepto: "Facturación y Cobro: Cargo por financiamiento de deuda", materiaId: 1, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga", "Servicio Móvil Postpago", "Internet Móvil", "LDI-Fija", "LDI-Servicio Móvil", "LDN"], medios: ["Acuerdo de financiamiento de deuda", "Recibo"] },
    { id: 6, concepto: "Facturación y Cobro: Pagos no procesados o registrados", materiaId: 1, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga", "Servicio Móvil Postpago", "Internet Móvil", "LDI-Fija", "LDI-Servicio Móvil", "LDN"], medios: ["Constancia de pago", "Histórico de estado de cuenta", "Informe de recaudación de pagos"] },
    { id: 7, concepto: "Facturación y Cobro: Montos no facturados oportunamente", materiaId: 1, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga", "Servicio Móvil Postpago", "Internet Móvil", "LDI-Fija", "LDI-Servicio Móvil", "LDN"], medios: ["Histórico de estado de cuenta", "Recibo"] },
    { id: 8, concepto: "Facturación y Cobro: Cobros de equipos terminales", materiaId: 1, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Servicio Móvil Postpago", "Internet Móvil"], medios: ["Acuerdo para la adquisición o financiamiento de equipos terminales", "Constancia de entrega de equipo o sim card", "Recibo"] },
    { id: 9, concepto: "Facturación y Cobro: Cobros por reintegro del descuento de equipos terminales", materiaId: 1, servicios: ["Servicio Móvil Postpago"], medios: ["Acuerdo para la adquisición de equipo terminal con descuento", "Cálculo de reintegro de precio de equipo", "Constancia de entrega de equipo o sim card", "Recibo"] },
    { id: 10, concepto: "Calidad en la Prestación del Servicio", materiaId: 2, servicios: ["Servicio Móvil Postpago", "Servicio Móvil Prepago", "Internet Móvil"], medios: ["Constancia de conformidad a la solución del problema de calidad o avería", "Detalle de consumos", "Informe de atención de los problemas de calidad y avería", "Registro de información de llamadas entrantes", "Registro de problemas de calidad y averías"] },
    { id: 11, concepto: "Calidad en la Prestación del Servicio", materiaId: 2, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga"], medios: ["Constancia de conformidad a la solución del problema de calidad o avería", "Constancia de primera visita de atención de reporte por problemas de calidad o avería de servicios fijos", "Detalle de consumos", "Inspección técnica", "Informe de atención de los problemas de calidad y avería", "Registro de información de llamadas entrantes", "Registro de problemas de calidad y averías"] },
    { id: 12, concepto: "Calidad en la Prestación del Servicio por problemas de velocidad", materiaId: 2, servicios: ["Internet de Acceso Fijo", "Internet Móvil"], medios: ["Constancia de conformidad a la solución del problema de calidad o avería", "Constancia de medición de velocidad del servicio de Internet", "Diagrama de tráfico (Traffic View)", "Informe de atención de los problemas de calidad y avería", "Registro de problemas de calidad y averías"] },
    { id: 13, concepto: "Incumplimiento de Condiciones Contractuales: Por la aplicación de condiciones y tarifas distintas a las pactadas en el contrato", materiaId: 3, servicios: ["Todos los servicios"], medios: ["Constancia de asignación de saldo", "Mecanismo de contratación", "Recibo"] },
    { id: 14, concepto: "Incumplimiento de Condiciones Contractuales: Incremento tarifario", materiaId: 3, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga", "Servicio Móvil Postpago", "Internet Móvil"], medios: ["Constancia de haber informado al abonado sobre el incremento tarifario", "Recibo"] },
    { id: 15, concepto: "Incumplimiento de Condiciones Contractuales, y Ofertas y Promociones: Descuentos de saldo o atributos", materiaId: 3, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga", "Servicio Móvil Postpago", "Internet Móvil", "LDI-Fija", "LDI-Servicio Móvil", "LDN"], medios: ["Detalle desagregado, valorizado y totalizado por cada modalidad o tipo de consumo del periodo reclamado", "Registro de problemas de calidad y averías", "Histórico de cortes y reactivaciones"] },
    { id: 16, concepto: "Incumplimiento de Condiciones Contractuales: Información sobre cobertura", materiaId: 3, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga", "Servicio Móvil Postpago", "Servicio Móvil Prepago", "Internet Móvil"], medios: ["Constancia de publicación de información de cobertura", "Mecanismo de contratación"] },
    { id: 17, concepto: "Incumplimiento de Condiciones Contractuales: Información sobre otras características o limitaciones del servicio", materiaId: 3, servicios: ["Todos los servicios"], medios: ["Mecanismo de contratación"] },
    { id: 18, concepto: "Incumplimiento de Ofertas y Promociones", materiaId: 3, servicios: ["Todos los servicios"], medios: ["Constancia de asignación de saldo", "Histórico de pedidos", "Mecanismo de contratación"] },
    { id: 19, concepto: "Falta de Servicio: Disconformidad con la interrupción", materiaId: 4, servicios: ["Todos los servicios"], medios: ["Detalle de consumos", "Histórico de cortes y reactivaciones", "Recibo", "Registro de problemas de calidad y averías"] },
    { id: 20, concepto: "Falta de Servicio: Suspensión por deuda de manera injustificada", materiaId: 4, servicios: ["Todos los servicios"], medios: ["Histórico de cortes y reactivaciones", "Histórico de estado de cuenta", "Histórico de reclamos", "Constancia de pago"] },
    { id: 21, concepto: "Falta de Servicio: Baja injustificada", materiaId: 4, servicios: ["Todos los servicios"], medios: ["Mecanismo de contratación (solicitud de baja)", "Histórico de Peticiones"] },
    { id: 22, concepto: "Falta de Servicio: Corte o baja sin observar el procedimiento establecido en la normativa vigente", materiaId: 4, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga", "Servicio Móvil Postpago", "Internet Móvil"], medios: ["Constancia de pago", "Constancia de comunicación al abonado de la fecha en que será ejecutado el corte y baja del servicio por falta de pago", "Consulta del estado del servicio", "Histórico de cortes y reactivaciones", "Histórico de estado de cuenta"] },
    { id: 23, concepto: "Falta de Servicio: Corte o baja sin observar el procedimiento establecido en la normativa vigente", materiaId: 4, servicios: ["Servicio Móvil Prepago"], medios: ["Constancia de comunicación al abonado de la baja del servicio contratado bajo la modalidad prepago", "Consulta del estado del servicio"] },
    { id: 24, concepto: "Falta de Servicio: Suspensión por uso prohibido", materiaId: 4, servicios: ["Servicio Móvil Prepago", "Servicio Móvil Postpago"], medios: ["Constancia de haber realizado el corte conforme lo dispuesto en las normas de uso prohibido", "Histórico de cortes y reactivaciones", "Informe de investigación de llamadas", "Reporte de CDR (Call Detail Register)"] },
    { id: 25, concepto: "Falta de Servicio: Falta de reactivación del servicio pese al pago del recibo", materiaId: 4, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga", "Servicio Móvil Postpago", "Internet Móvil"], medios: ["Constancia de pago", "Histórico de cortes y reactivaciones", "Histórico de estado de cuenta"] },
    { id: 26, concepto: "Falta de Servicio: Cambio de titularidad del servicio sin consentimiento del abonado", materiaId: 4, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Internet Móvil", "Televisión de Paga"], medios: ["Histórico de cambio de titularidad del servicio", "Mecanismo de contratación (solicitud de cambio de titularidad)"] },
    { id: 27, concepto: "Falta de Servicio: Cambio de titularidad del servicio sin consentimiento del abonado", materiaId: 4, servicios: ["Servicio Móvil Prepago", "Servicio Móvil Postpago"], medios: ["Constancia de validación de código como confirmación del consentimiento del abonado para realizar la portabilidad o para la cesión de posición contractual", "Histórico de cambio de titularidad del servicio", "Mecanismo de contratación (solicitud de cambio de titularidad)", "Reporte de verificación biométrica de huella dactilar"] },
    { id: 28, concepto: "Falta de Servicio: Reposición de SIM card sin consentimiento del abonado", materiaId: 4, servicios: ["Servicio Móvil Prepago", "Servicio Móvil Postpago"], medios: ["Mecanismo de contratación (solicitud de reposición de SIM card)", "Reporte de verificación biométrica de huella dactilar"] },
    { id: 29, concepto: "Instalación del Servicio: Falta de instalación", materiaId: 5, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga"], medios: ["Constancia de instalación del servicio", "Recibo"] },
    { id: 30, concepto: "Activación del Servicio: Falta de activación", materiaId: 5, servicios: ["Servicio Móvil Postpago", "Servicio Móvil Prepago", "Internet Móvil"], medios: ["Consulta del estado del servicio", "Recibo"] },
    { id: 31, concepto: "Traslado del Servicio: Por la falta de traslado del servicio", materiaId: 5, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga"], medios: ["Constancia de haber presentado una solicitud determinada", "Constancia de instalación del servicio", "Histórico de pedidos", "Recibo"] },
    { id: 32, concepto: "Traslado del Servicio: Por la falta de respuesta a la solicitud de traslado o negativa a la misma", materiaId: 5, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga"], medios: ["Constancia de haber presentado una solicitud determinada", "Constancia donde se informa la imposibilidad de realizar el traslado del servicio", "Histórico de pedidos"] },
    { id: 33, concepto: "Instalación, Activación o Traslado del Servicio: Falta de devolución de los montos cobrados por instalación, activación o traslado no ejecutados", materiaId: 5, servicios: ["Todos los servicios"], medios: ["Constancia de devoluciones por pagos indebidos o en exceso", "Histórico de estado de cuenta"] },
    { id: 34, concepto: "Falta de Ejecución de Baja del Servicio", materiaId: 6, servicios: ["Todos los servicios"], medios: ["Constancia de haber presentado una solicitud determinada", "Histórico de pedidos", "Consulta del estado del servicio"] },
    { id: 35, concepto: "Falta de Ejecución de Suspensión Temporal del Servicio", materiaId: 6, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga", "LDI-Fija", "LDI-Servicio Móvil", "LDN"], medios: ["Constancia de haber presentado una solicitud determinada", "Histórico de pedidos", "Recibo"] },
    { id: 36, concepto: "Falta de Ejecución de Suspensión Temporal del Servicio", materiaId: 6, servicios: ["Servicio Móvil Postpago", "Internet Móvil"], medios: ["Constancia de haber presentado una solicitud determinada", "Constancia de ingreso o salida del equipo al servicio técnico", "Histórico de pedidos", "Recibo"] },
    { id: 37, concepto: "Recargas", materiaId: 7, servicios: ["Todos los servicios"], medios: ["Constancia de asignación de saldo", "Detalle de consumos", "Histórico de recargas", "Mecanismo de contratación (paquetes no solicitados)"] },
    { id: 38, concepto: "Contratación No Solicitada", materiaId: 8, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga"], medios: ["Acuerdo para la adquisición o financiamiento de equipos terminales", "Constancia de instalación del servicio", "Mecanismo de contratación"] },
    { id: 39, concepto: "Contratación No Solicitada", materiaId: 8, servicios: ["Servicio Móvil Prepago", "Servicio Móvil Postpago"], medios: ["Acuerdo para la adquisición o financiamiento de equipos terminales", "Mecanismo de contratación", "Reporte de verificación biométrica de huella dactilar"] },
    { id: 40, concepto: "Migración: Condicionamiento, negativa, falta de respuesta y falta de ejecución de la solicitud de migración", materiaId: 9, servicios: ["Todos los servicios"], medios: ["Constancia de haber presentado una solicitud determinada", "Constancia donde se informa la imposibilidad de realizar la migración del servicio", "Histórico de pedidos", "Historial de comunicaciones o atenciones", "Recibo"] },
    { id: 41, concepto: "Migración: Migración no solicitada", materiaId: 9, servicios: ["Todos los servicios"], medios: ["Mecanismo de contratación (solicitud de migración)", "Recibo"] },
    { id: 42, concepto: "Portabilidad: Negativa a recibir la solicitud de portabilidad", materiaId: 10, servicios: ["Telefonía Fija", "Servicio Móvil Prepago", "Servicio Móvil Postpago"], medios: ["Historial de comunicaciones o atenciones"] },
    { id: 43, concepto: "Portabilidad: Falta de entrega de información sobre portabilidad", materiaId: 10, servicios: ["Telefonía Fija", "Servicio Móvil Prepago", "Servicio Móvil Postpago"], medios: ["Solicitud de portabilidad"] },
    { id: 44, concepto: "Portabilidad: Falta de consentimiento del abonado para efectuar la portabilidad", materiaId: 10, servicios: ["Telefonía Fija"], medios: ["Mecanismo de contratación", "Solicitud de portabilidad"] },
    { id: 45, concepto: "Portabilidad: Falta de consentimiento del abonado para efectuar la portabilidad", materiaId: 10, servicios: ["Servicio Móvil Prepago", "Servicio Móvil Postpago"], medios: ["Constancia de validación de código como confirmación del consentimiento del abonado para realizar la portabilidad o para la cesión de posición contractual", "Mecanismo de contratación", "Reporte de verificación biométrica de huella dactilar", "Solicitud de portabilidad"] },
    { id: 46, concepto: "Portabilidad: Falta de cobertura", materiaId: 10, servicios: ["Telefonía Fija", "Servicio Móvil Prepago", "Servicio Móvil Postpago"], medios: ["Mecanismo de contratación", "Reporte de publicación de información de cobertura"] },
    { id: 47, concepto: "Negativa a contratar el servicio", materiaId: 11, servicios: ["Todos los servicios"], medios: ["Historial de comunicaciones o atenciones (en caso la empresa operadora no reconozca que se haya realizado una atención para la contratación del servicio)"] },
    { id: 48, concepto: "Falta de entrega de recibo", materiaId: 11, servicios: ["Telefonía Fija", "Internet de Acceso Fijo", "Televisión de Paga", "Servicio Móvil Postpago", "Internet Móvil"], medios: ["Acuse de recepción del recibo enviado vía electrónica", "Constancia de entrega del recibo de manera física", "Recibo"] },
    { id: 49, concepto: "Negativa a brindar la facturación detallada o llamadas entrantes", materiaId: 11, servicios: ["Telefonía Fija", "Servicio Móvil Prepago", "Servicio Móvil Postpago"], medios: ["Constancia de haber presentado una solicitud determinada", "Histórico de pedidos"] }
  ],

  analystReqs: {
    indications: [
      "Las capacitaciones se realizarán a través de Google Meet.",
      "El participante debe contar con webcam encendida al realizar los temas top de la campaña.",
      "Se debe contar con Laptop o PC para la capacitación (no está permitido realizarlo desde el celular)."
    ],
    pcRequirements: {
      processor: "Intel Core i3 - 5ta generación o superior / AMD Ryzen 3 o superior.",
      ram: "8 GB o superior.",
      speed: "Mínimo 40 Mbps de Descarga (Bajada) y 40 Mbps de Carga (Subida).",
      os: "Windows 10 o Windows 11.",
      office: "Microsoft Office activado.",
      connection: "Conexión a internet cableada obligatoria (no Wi-Fi)."
    },
    dxdiagSteps: [
      "Presione la combinación de teclas: Windows + R",
      "En la ventana Ejecutar que aparece, ingrese el texto: dxdiag y presione Enter para abrir las herramientas de diagnóstico y ver procesador, RAM y sistema operativo."
    ],
    speedtestSteps: [
      "Ingrese a la página web: https://www.speedtest.net/es",
      "Haga clic en 'Inicio' y verifique que la velocidad de descarga y carga sea de mínimo 40 Mbps."
    ],
    location: {
      address: "Calle José Bernardo Alcedo 420, Lince, Lima.",
      reference: "Al frente de la SUNARP."
    }
  },
  billingCycles: [
    { firma: "1", ciclo: "1", inicio: "1", emision: "22", cierre: "30, 31", days: [1] },
    { firma: "2", ciclo: "2", inicio: "2", emision: "23", cierre: "1", days: [2] },
    { firma: "3", ciclo: "3", inicio: "3", emision: "24", cierre: "2", days: [3] },
    { firma: "4 o 5", ciclo: "4", inicio: "4", emision: "25", cierre: "3", days: [4, 5] },
    { firma: "6", ciclo: "6", inicio: "6", emision: "26", cierre: "5", days: [6] },
    { firma: "7", ciclo: "7", inicio: "7", emision: "27", cierre: "6", days: [7] },
    { firma: "8", ciclo: "8", inicio: "8", emision: "1", cierre: "7", days: [8] },
    { firma: "9", ciclo: "9", inicio: "9", emision: "2", cierre: "8", days: [9] },
    { firma: "10", ciclo: "10", inicio: "10", emision: "3", cierre: "9", days: [10] },
    { firma: "11", ciclo: "11", inicio: "11", emision: "4", cierre: "10", days: [11] },
    { firma: "12", ciclo: "12", inicio: "12", emision: "5", cierre: "11", days: [12] },
    { firma: "13", ciclo: "13", inicio: "13", emision: "6", cierre: "12", days: [13] },
    { firma: "14 o 15", ciclo: "14", inicio: "14", emision: "7", cierre: "13", days: [14, 15] },
    { firma: "16", ciclo: "16", inicio: "16", emision: "9", cierre: "15", days: [16] },
    { firma: "17", ciclo: "17", inicio: "17", emision: "10", cierre: "16", days: [17] },
    { firma: "18, 19, 20", ciclo: "18", inicio: "18", emision: "11", cierre: "17", days: [18, 19, 20] },
    { firma: "21", ciclo: "21", inicio: "21", emision: "14", cierre: "20", days: [21] },
    { firma: "22", ciclo: "22", inicio: "22", emision: "15", cierre: "21", days: [22] },
    { firma: "23", ciclo: "23", inicio: "23", emision: "16", cierre: "22", days: [23] },
    { firma: "24", ciclo: "24", inicio: "24", emision: "17", cierre: "23", days: [24] },
    { firma: "25", ciclo: "25", inicio: "25", emision: "18", cierre: "24", days: [25] },
    { firma: "26", ciclo: "26", inicio: "26", emision: "19", cierre: "25", days: [26] },
    { firma: "27", ciclo: "27", inicio: "27", emision: "20", cierre: "26", days: [27] },
    { firma: "28, 29, 30, 31", ciclo: "28", inicio: "28", emision: "21", cierre: "27", days: [28, 29, 30, 31] }
  ]
};

// Exponer como global para compatibilidad
window.CLAIMS_DATA = CLAIMS_DATA;
