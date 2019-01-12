# eleicoes

## Ambiente de desenvolvimento

-   Instalação java 8

    ```
    $ sudo add-apt-repository ppa:webupd8team/java
    ```

    ```
    $ sudo apt-get update
    ```

    ```
    $ sudo apt-get install oracle-java8-installer
    ```

    ```
    $ sudo apt-get install oracle-java8-set-default
    ```

-   Instalação do JHipster 5.7.2

    -   Instalação do node v8.10.0

    ```
    $ sudo apt-get install -y nodejs
    ```

    -   Instalação do npm >3.5.2

    ```
    $ sudo apt-get install npm
    ```

    -   Instalação do Yeoman

    ```
    $ sudo npm install -g yo
    ```

    -   Instalação do JHipster

    ```
    $ sudo npm install -g generator-jhipster
    ```

## Desenvolvimento

-   Download repositório github

    https://github.com/felipeaaugusto/eleicoes.git

-   Rodar o front-end e back-end

    ```
    $ sudo ./mvnw
    ```

-   Rodar o front-end com live reload

    ```
    $ sudo npm start
    ```

-   Limpando database

    ```
    ./mvnw liquibase:dropAll
    ```

    ```
    $ sudo ./mvnw clean
    ```

## Produção

-   Rodar server produção

    ```
    $ sudo ./mvnw -Pprod clean package
    ```

-   Isso irá concatenar e minificar os arquivos CSS e JavaScript do cliente. Ele também modificará o `index.html` para que ele faça referência a esses novos arquivos. Para garantir que tudo funcionou, execute:

    ```
    java -jar target/*.war
    ```

## Configuração inicial

-   Usuário admin

    user: admin

    pass: admin
