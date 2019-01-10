package br.com.eleicoes.web.rest;

import br.com.eleicoes.EleicoesApp;

import br.com.eleicoes.domain.Voto;
import br.com.eleicoes.domain.Cargo;
import br.com.eleicoes.domain.Candidato;
import br.com.eleicoes.domain.Eleicao;
import br.com.eleicoes.repository.VotoRepository;
import br.com.eleicoes.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static br.com.eleicoes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VotoResource REST controller.
 *
 * @see VotoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EleicoesApp.class)
public class VotoResourceIntTest {

    private static final String DEFAULT_CPF = "AAAAAAAAAAA";
    private static final String UPDATED_CPF = "BBBBBBBBBBB";

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_PROTOCOLO = "AAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_PROTOCOLO = "BBBBBBBBBBBBBBBBBBB";

    @Autowired
    private VotoRepository votoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restVotoMockMvc;

    private Voto voto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VotoResource votoResource = new VotoResource(votoRepository);
        this.restVotoMockMvc = MockMvcBuilders.standaloneSetup(votoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Voto createEntity(EntityManager em) {
        Voto voto = new Voto()
            .cpf(DEFAULT_CPF)
            .nome(DEFAULT_NOME)
            .protocolo(DEFAULT_PROTOCOLO);
        // Add required entity
        Cargo cargo = CargoResourceIntTest.createEntity(em);
        em.persist(cargo);
        em.flush();
        voto.setCargo(cargo);
        // Add required entity
        Candidato candidato = CandidatoResourceIntTest.createEntity(em);
        em.persist(candidato);
        em.flush();
        voto.setCandidato(candidato);
        // Add required entity
        Eleicao eleicao = EleicaoResourceIntTest.createEntity(em);
        em.persist(eleicao);
        em.flush();
        voto.setEleicao(eleicao);
        return voto;
    }

    @Before
    public void initTest() {
        voto = createEntity(em);
    }

    @Test
    @Transactional
    public void createVoto() throws Exception {
        int databaseSizeBeforeCreate = votoRepository.findAll().size();

        // Create the Voto
        restVotoMockMvc.perform(post("/api/votos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voto)))
            .andExpect(status().isCreated());

        // Validate the Voto in the database
        List<Voto> votoList = votoRepository.findAll();
        assertThat(votoList).hasSize(databaseSizeBeforeCreate + 1);
        Voto testVoto = votoList.get(votoList.size() - 1);
        assertThat(testVoto.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testVoto.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testVoto.getProtocolo()).isEqualTo(DEFAULT_PROTOCOLO);
    }

    @Test
    @Transactional
    public void createVotoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = votoRepository.findAll().size();

        // Create the Voto with an existing ID
        voto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVotoMockMvc.perform(post("/api/votos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voto)))
            .andExpect(status().isBadRequest());

        // Validate the Voto in the database
        List<Voto> votoList = votoRepository.findAll();
        assertThat(votoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCpfIsRequired() throws Exception {
        int databaseSizeBeforeTest = votoRepository.findAll().size();
        // set the field null
        voto.setCpf(null);

        // Create the Voto, which fails.

        restVotoMockMvc.perform(post("/api/votos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voto)))
            .andExpect(status().isBadRequest());

        List<Voto> votoList = votoRepository.findAll();
        assertThat(votoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = votoRepository.findAll().size();
        // set the field null
        voto.setNome(null);

        // Create the Voto, which fails.

        restVotoMockMvc.perform(post("/api/votos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voto)))
            .andExpect(status().isBadRequest());

        List<Voto> votoList = votoRepository.findAll();
        assertThat(votoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProtocoloIsRequired() throws Exception {
        int databaseSizeBeforeTest = votoRepository.findAll().size();
        // set the field null
        voto.setProtocolo(null);

        // Create the Voto, which fails.

        restVotoMockMvc.perform(post("/api/votos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voto)))
            .andExpect(status().isBadRequest());

        List<Voto> votoList = votoRepository.findAll();
        assertThat(votoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVotos() throws Exception {
        // Initialize the database
        votoRepository.saveAndFlush(voto);

        // Get all the votoList
        restVotoMockMvc.perform(get("/api/votos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(voto.getId().intValue())))
            .andExpect(jsonPath("$.[*].cpf").value(hasItem(DEFAULT_CPF.toString())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].protocolo").value(hasItem(DEFAULT_PROTOCOLO.toString())));
    }
    
    @Test
    @Transactional
    public void getVoto() throws Exception {
        // Initialize the database
        votoRepository.saveAndFlush(voto);

        // Get the voto
        restVotoMockMvc.perform(get("/api/votos/{id}", voto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(voto.getId().intValue()))
            .andExpect(jsonPath("$.cpf").value(DEFAULT_CPF.toString()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.protocolo").value(DEFAULT_PROTOCOLO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVoto() throws Exception {
        // Get the voto
        restVotoMockMvc.perform(get("/api/votos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVoto() throws Exception {
        // Initialize the database
        votoRepository.saveAndFlush(voto);

        int databaseSizeBeforeUpdate = votoRepository.findAll().size();

        // Update the voto
        Voto updatedVoto = votoRepository.findById(voto.getId()).get();
        // Disconnect from session so that the updates on updatedVoto are not directly saved in db
        em.detach(updatedVoto);
        updatedVoto
            .cpf(UPDATED_CPF)
            .nome(UPDATED_NOME)
            .protocolo(UPDATED_PROTOCOLO);

        restVotoMockMvc.perform(put("/api/votos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVoto)))
            .andExpect(status().isOk());

        // Validate the Voto in the database
        List<Voto> votoList = votoRepository.findAll();
        assertThat(votoList).hasSize(databaseSizeBeforeUpdate);
        Voto testVoto = votoList.get(votoList.size() - 1);
        assertThat(testVoto.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testVoto.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testVoto.getProtocolo()).isEqualTo(UPDATED_PROTOCOLO);
    }

    @Test
    @Transactional
    public void updateNonExistingVoto() throws Exception {
        int databaseSizeBeforeUpdate = votoRepository.findAll().size();

        // Create the Voto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVotoMockMvc.perform(put("/api/votos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voto)))
            .andExpect(status().isBadRequest());

        // Validate the Voto in the database
        List<Voto> votoList = votoRepository.findAll();
        assertThat(votoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVoto() throws Exception {
        // Initialize the database
        votoRepository.saveAndFlush(voto);

        int databaseSizeBeforeDelete = votoRepository.findAll().size();

        // Get the voto
        restVotoMockMvc.perform(delete("/api/votos/{id}", voto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Voto> votoList = votoRepository.findAll();
        assertThat(votoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Voto.class);
        Voto voto1 = new Voto();
        voto1.setId(1L);
        Voto voto2 = new Voto();
        voto2.setId(voto1.getId());
        assertThat(voto1).isEqualTo(voto2);
        voto2.setId(2L);
        assertThat(voto1).isNotEqualTo(voto2);
        voto1.setId(null);
        assertThat(voto1).isNotEqualTo(voto2);
    }
}
