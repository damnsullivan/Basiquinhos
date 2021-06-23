#-----------------------------------#
FUNCTION cadastrarNota(lr_notaAluno)
#-----------------------------------#

   DEFINE l_media DECIMAL (13,2)

   
   DEFINE lr_notaAluno RECORD 
      nome_aluno STRING,
      nota1 FLOAT,
      nota2 FLOAT,
      nota3 FLOAT
   END RECORD
   
   LET l_media = (lr_notaAluno.nota1 + lr_notaAluno.nota2 + lr_notaAluno.nota3) / 3
   
   WHENEVER ERROR CONTINUE
   INSERT INTO notas_danny1( 
               nome,
               nota1,
               nota2,
               nota3,
               media
               )
          VALUES (lr_notaAluno.nome_aluno, lr_notaAluno.nota1, lr_notaAluno.nota2, lr_notaAluno.nota3, l_media
          )
    WHENEVER ERROR STOP
    
   IF sqlca.sqlcode <> 0 THEN 
    ERROR "Falha ao cadastrar nota"
   ELSE
      MESSAGE "Nota cadastrada com sucesso!"
      DISPLAY l_media
      CALL ui.Interface.frontCall("webcomponent",
                          "call",
                          ["formonly.formweb", "setMedia", l_media],
                          [])
   END IF

END FUNCTION 

#----------------------#
FUNCTION pesquisar()
#----------------------#

   DEFINE lr_notaAluno DYNAMIC ARRAY OF RECORD
        codigo INT,
        nome_aluno STRING,
        nota1 DECIMAL (13,2),
        nota2 DECIMAL  (13,2),
        nota3 DECIMAL (13,2),
        media DECIMAL (13,2)
    END RECORD

   DEFINE l_ind INT

   DECLARE cq_pesquisa CURSOR FOR SELECT * FROM notas_danny1

   LET l_ind = 1
    FOREACH cq_pesquisa INTO lr_notaAluno[l_ind].*
      LET l_ind = l_ind +1
   END FOREACH
   DISPLAY ""

      CALL lr_notaAluno.deleteElement(lr_notaAluno.getLength())
      CALL ui.Interface.frontCall("webcomponent",
                          "call",
                          ["formonly.formweb", "consultaNota", lr_notaAluno],
                          [])
END FUNCTION 

#-----------------------#
FUNCTION excluir(l_dados)
#-----------------------#

   DEFINE l_dados STRING 

   DELETE 
   FROM notas_danny1
   WHERE codigo = l_dados

   CALL pesquisar()

END FUNCTION

#-------------------------------#
FUNCTION getDadosAluno(l_dados)
#-------------------------------#
   DEFINE l_ind INT
   DEFINE l_dados STRING
   DEFINE l_media DECIMAL (13,2)

   DEFINE lr_notaAluno1 RECORD
          nota1 DECIMAL (13,2),
          nota2 DECIMAL (13,2),
          nota3 DECIMAL (13,2),
          media DECIMAL (13,2),
          codigo INT

   END RECORD 

   SELECT nota1,
          nota2,
          nota3,
          media,
          codigo

   INTO lr_notaAluno1.*
   FROM notas_danny1
   WHERE codigo = l_dados

   CALL ui.Interface.frontCall("webcomponent",
                        "call",
                        ["formonly.formweb", "setDadosAluno", lr_notaAluno1],
                        [])
END FUNCTION 

#------------------------------#
FUNCTION salvar_notas(l_dados)
#------------------------------#

   DEFINE l_dados STRING
   
   DEFINE lr_salvar RECORD
          nota1 DECIMAL,
          nota2 DECIMAL,
          nota3 DECIMAL,
          media DECIMAL,
          codigo INT
    END RECORD

    DEFINE l_json util.JSONObject
       LET l_json = util.JSONObject.create ()
       LET l_json = util.JSONObject.parse(l_dados)
       CALL l_json.toFGL(lr_salvar)

    WHENEVER ERROR CONTINUE
    UPDATE notas_danny1
    SET nota1 = lr_salvar.nota1,
        nota2 = lr_salvar.nota2,
        nota3 = lr_salvar.nota3,
        media = lr_salvar.media
    WHERE codigo = lr_salvar.codigo
    WHENEVER ERROR STOP 

    IF sqlca.sqlcode = 0 THEN
       MESSAGE "Objeto modificado com sucesso."
    ELSE
       ERROR "Objeto não modificado."
    END IF 

END FUNCTION 
