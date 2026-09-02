---
syncRef: af8ece4296e987223de16f4e0311366cb5e8d623
---

# Triaje de errores del OSS de Mojaloop

### Notificar un error o problema

Si hay un error o un problema en general, se registra un problema como error o solicitud de funcionalidad en el repositorio [project](https://github.com/mojaloop/project/issues/new/choose) y, en algunos casos, se vincula a un problema registrado en el repositorio de ese componente concreto.

Existe una [plantilla](https://github.com/mojaloop/project/issues/new?assignees=&labels=bug&template=bug_report.md&title=) de error que se puede usar y que fomenta incluir detalles como las versiones, los resultados esperados y otros datos que ayudan con el triaje y con la reproducción del problema.

### Una vez registrado un error

1. Normalmente, el error se tría inicialmente en el canal público [#ml-oss-bug-triage](https://mojaloop.slack.com/messages/CMCVBHPUH) del Slack de Mojaloop
2. Para los problemas de seguridad y otros problemas sensibles, el error se tría en un canal privado con los contribuyentes actuales, antes de que la información se haga pública en el momento apropiado. Los detalles sobre los problemas de seguridad se cubren aquí: https://docs.mojaloop.io/community/contributing/cvd.html
3. Durante el triaje del error se le asignan prioridad y gravedad, tras el consenso de la mayoría y la consulta con quienes lo notificaron
4. En función de la prioridad y la gravedad, el error lo asume el equipo principal u otros contribuyentes, en un esfuerzo colaborativo.
5. Una vez asumido, la conversación y las actualizaciones ocurren en el problema de GitHub y en el canal de slack.

### Triaje

1. El debate sobre el problema es abierto al público en el caso de los errores o problemas normales
2. En función de los debates, el equipo principal toma la decisión final sobre la prioridad y la gravedad del problema, en consulta con quienes lo notificaron.
3. La lista y el proceso se actualizarán a medida que evolucionen.
4. Canal de slack de triaje de errores de Mojaloop #[ml-oss-bug-triage](https://mojaloop.slack.com/archives/CMCVBHPUH)
