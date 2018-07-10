    var obj = JSON.parse(
        '{ "nota":"El contenido de este informe ha sido validado digitalmente siguiendo los estándares de calidad y seguridad requeridos. El efector es responsable Inscripto en el Registro Nacional de Protección de datos Personales bajo el N° de Registro XXXXXXXXXXXXXXXX, según lo requiere la Ley N° 25.326 (art. 3° y 21 inciso 1).,"}'
    );
   
        document.getElementById("pdp").innerHTML = obj.nota;