define(['dojo/_base/declare', 'jimu/BaseWidget',"esri/tasks/QueryTask", "esri/tasks/query",'dojo/_base/lang',"esri/SpatialReference","esri/graphic", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol","esri/Color",],
  function(declare, BaseWidget, QueryTask,Query, lang,SpatialReference,Graphic, SimpleFillSymbol,SimpleLineSymbol,Color) {

    return declare([BaseWidget], {


      baseClass: 'jimu-widget-customwidget',

      cargaConcellos: function () {
        console.log("cargaConcellos", this);

        let codigoProvincia = this.selectProvincia.value;

        if (codigoProvincia == -1) return;

        this.listaConcellos.innerHTML = "";

        const queryTask = new QueryTask(this.config.servicioConcellos);

        const query = new Query();
        query.returnGeometry = false;
        query.outFields = ["CODCONC", "CONCELLO"];
        query.where = "CODPROV = " + codigoProvincia;

        queryTask.execute(query, lang.hitch(this, function (resultados) {
              console.log(resultados);

              var op = document.createElement("option");

              op.value = -1;

              op.text = "Seleccione un concello";

              this.listaConcellos.add(op);

              for (var i = 0; i < resultados.features.length; i++) {

                    op = document.createElement("option");

                    op.value = resultados.features[i].attributes.CODCONC;

                    op.text = resultados.features[i].attributes.CONCELLO;

                    this.listaConcellos.add(op);
              }
        }));
  },

      cargaParroquias: function() {
       console.log('cargaParroquia');
       let codigoConcello = this.listaConcellos.value;

       if (codigoConcello == -1) return;

       this.listaParroquias.innerHTML = "";

       const queryTask1 = new QueryTask(this.config.servicioParroquias);

       const query1 = new Query();
       query1.returnGeometry = false;
       query1.outFields = ["CODPARRO", "PARROQUIA"];
       query1.where = "CODCONC = " + codigoConcello;

       queryTask1.execute(query1, lang.hitch(this, function (resultados) {
             console.log(resultados);

             var op2 = document.createElement("option");

             op2.value = -1;

             op2.text = "Seleccione una parroquia";

             this.listaParroquias.add(op2);

             for (var i = 0; i < resultados.features.length; i++) {

                   op2 = document.createElement("option");

                   op2.value = resultados.features[i].attributes.CODPARRO;

                   op2.text = resultados.features[i].attributes.PARROQUIA;

                   this.listaParroquias.add(op2);
             }
       }));
 },

      zoomConcello: function(){
        console.log('zoomConcello');
        let codigoConcello = this.listaConcellos.value;

        if (codigoConcello == -1) return;
 
        const queryTask2 = new QueryTask(this.config.servicioConcellos);
        const query2 = new Query();
        query2.returnGeometry = true;
        query2.outFields = ["CODCONC", "CONCELLO"];
        query2.where = "CODCONC = " + codigoConcello;
        query2.outSpatialReference = new SpatialReference(102100);
        queryTask2.execute(query2, lang.hitch(this, function (resultados) {
          console.log(resultados);
          if (resultados.features.length > 0) {
          var geometria = resultados.features[0].geometry;
          this.map.graphics.clear();
          this.map.graphics.add(new Graphic(geometria, new SimpleFillSymbol(SimpleFillSymbol.STYLE_VERTICAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOTDOT, new Color([255,0,0]),
          3))));
          this.map.setExtent(geometria.getExtent(), true);
}
}));
},

      zoomParroquia: function(){
        console.log('zoomParroquia');
        let codigoParroquia = this.listaParroquias.value;

        if (codigoParroquia == -1) return;
 
        const queryTask3 = new QueryTask(this.config.servicioParroquias);
        const query3 = new Query();
        query3.returnGeometry = true;
        query3.outFields = ["CODPARRO", "PARROQUIA"];
        query3.where = "CODPARRO = " + codigoParroquia;
        query3.outSpatialReference = new SpatialReference(102100);
        queryTask3.execute(query3, lang.hitch(this, function (resultados) {
          console.log(resultados);
          if (resultados.features.length > 0) {
          var geometria2 = resultados.features[0].geometry;
          this.map.graphics.clear();
          this.map.graphics.add(new Graphic(geometria2, new SimpleFillSymbol(SimpleFillSymbol.STYLE_VERTICAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOTDOT, new Color([255,0,0]),
          3))));
          this.map.setExtent(geometria2.getExtent(), true);
}
}));
},
});
});