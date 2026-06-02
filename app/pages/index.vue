<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import shaderBg from '~/assets/shaderprogrammingbg.jpg'
import fyipCard from '~/assets/fyipimage.jpg'
import eroCard from '~/assets/EROcardimage.png'
import eotttCard from '~/assets/EOTTTimage.png'
import echoCard from '~/assets/Echoimage.jpg'
import peterCard from '~/assets/PeterDefeater.png'
import minigamesCard from '~/assets/year1minigamesimage.jpg'
import jamsCard from '~/assets/gamejamsimage.jpg'

const sections = [
  { id: 'home', label: 'HOME' },
  { id: 'games', label: 'GAMES' },
  { id: 'technical-projects', label: 'TECHNICAL' },
  { id: 'about', label: 'ABOUT' }
]

const currentIndex = ref(0)
const isAutoScrolling = ref(false)
const isGlobalModalOpen = useState('isModalActive', () => false)

const games = [
  {
    title: 'Echo: Bound by Choice',
    year: '2025',
    isTech: true,
    bg: echoCard,
    description: 'Atmospheric puzzle game (UE). Features interactive CCTV mechanics, tactile object inspection, and responsive level design. Players solve environmental puzzles through critical thinking and exploration in a suspenseful setting.',
    learned: 'Mastered player-centric design through iterative playtesting. Learned to identify and fix UX friction points—like awkward interaction angles—to ensure mechanics are as intuitive as the puzzles are clever.',
    done: 'Iterative Design & Polish:\n- Analyzed playtests to overhaul UI/UX and interaction ranges.\n- Replaced text prompts with intuitive 3D rotation icons.\n- Restructured collision systems to fix physical clipping in wardrobe mechanics.\n- Expanded scope with additional puzzles and a satisfying alternate ending.',
    summary: 'Engineered core gameplay systems including a functional CCTV mechanic for spatial observation, complex physics-based object interactions for clue discovery, and balanced environmental puzzle logic designed to challenge critical thinking without sacrificing player flow.',
    youtube: 'o1Nd_0fGwSg'
  },
  {
    title: 'Echoes Of The Twin Tombs',
    year: '2025',
    isTech: true,
    bg: eotttCard,
    bgSize: 'cover',
    bgPos: '100% center',
    description: 'Asymmetrical VR co-op escape room (Unity, Normcore, XRIT). Two players—the Engineer and the Navigator—collaborate across physical spaces using forced asymmetric knowledge to solve ancient puzzles through continuous verbal communication.',
    learned: 'Balanced network engineering with immersive design. Gained expertise in motion sickness mitigation, optimized physics calculations, and conceptualizing aesthetics that leverage VR\'s unique strengths.',
    done: 'Art Direction & Pre-Production:\n- Directed the Egyptian Tomb aesthetic for immersion and comfort.\n- Mapped complex networked puzzle states via Excalidraw and Mermaid.\n- Aligned teams to prevent scope creep and ensure thematic cohesion.',
    summary: 'Developed advanced XR systems featuring recursive raycasting for networked laser puzzles, zero-latency tactile interactions utilizing XRIT and Normcore interpolation, and immersive multi-sensory feedback loops that synchronize spatial audio with dynamic visual cues.',
    youtube: 'yrYdrjQj2Is'
  },
  {
    title: 'E.R.O.',
    year: '2025',
    fullTitle: 'Experimental Reconstruction Organism',
    itch: 'https://altf5studios.itch.io/ero',
    bg: eroCard,
    description: 'Gameplay & Blueprint Replication Programmer (UE5). A co-op sandbox survival game where players awaken as cyborgs on a fractured island. Features resource gathering, crafting, and base-building in a stylized low-poly world.',
    learned: 'Mastered UE5\'s Blueprint replication. Learned to separate server authority from client-side logic, translating complex networking concepts into robust, synchronized multiplayer gameplay.',
    done: 'Gameplay & Systems Programming:\n- Developed core crafting, tree-chopping, and base-building with ghost previews.\n- Engineered logic for interactable items and gameplay props in a shared environment.\n- Collaborated on resource consumption and authorized server-client actions.',
    summary: 'Spearheaded Blueprint replication architecture by implementing robust server-client communication via RPCs and variable replication, while maintaining detailed technical documentation to synchronize complex environmental mechanics like dynamic day/night cycles across a shared world.',
    youtube: 'APRTWH3-Zko'
  },
  {
    title: 'Minigames',
    year: '2024',
    hideLinks: true,
    isMinigame: true,
    bg: minigamesCard,
    description: 'A collection of formative university projects including "Extraterrestrial Escape" (3D Survival/Stealth) and "!super!mario" (2D Platformer). These projects represent my transition from solo learning to collaborative group environments.',
    learned: 'Solidified skills in rapid prototyping, 3D physics, and managing scope within team environments. Laid the groundwork for 2D physics, collision detection, and formal game loops.',
    done: 'Key Contributions:\n- Programmed physics-based FPC utilizing Unity\'s New Input System.\n- Developed 2D platformer mechanics including coin/key collection.',
    youtube: 'id97n-Y8GKk'
  },
  {
    title: 'Game Jams',
    year: '2024-2026',
    hideLinks: true,
    isGameJam: true,
    bg: jamsCard,
    description: 'Cornerstone of my growth as a developer. These 48-hour sprints test project management, risk assessment, and technical versatility. Evolved from a novice into a technical facilitator bridging code, art, and audio.',
    learned: 'Taught the value of "technical glue" roles, the absolute necessity of strict Git version control, and timeboxing tasks under extreme pressure. Cemented industry standards for rapid iteration and hardware preparedness.',
    done: 'The Monster Rush:\n- UI Programmer & Audio Integrator. Subverted the "Moderation" theme with rule-breaking comedic loops.\n\nSplash N\' Dash:\n- Technical Developer & 3D Artist. Physics-based QWOP-style kayaking prototype under extreme logistical hurdles.\n\nColosseum Ascendant:\n- Support Programmer. Swords and Sandals-inspired RPG withStat allocation and knowledge checks.',
    youtube: '3mIomRHWbt8'
  }
]

const techProjects = [
  {
    title: 'FIRE SAFETY SIMULATION',
    isTech: true,
    bg: fyipCard,
    description: 'A 3D, AI-powered crowd simulation developed in Unity to optimize emergency evacuation planning by modeling dynamic fire hazards and realistic human psychological friction.',
    learned: 'Unity 3D, C#, Agent-Based Modeling, Finite State Machines (FSM), Custom Pathfinding, Explainable AI (XAI) Logging.',
    done: 'Engineered autonomous agents with decentralized perception, cognitive delays, and peer-to-peer hazard communication to benchmark adaptive survival rates against static routing.',
    summary: 'Traditional evacuation models often use static routing that ignores human panic. This 3D prototype stress-tests terminal layouts using perception-driven AI. Agents feature realistic constraints like restricted vision and cognitive delays, triggering peer-to-peer "Information Cascades". The simulation benchmarked a traditional model against this Adaptive AI; while static routing led to fatal bottlenecks, the Adaptive AI achieved a 100% survival rate by rerouting dynamically. Includes an XAI logging architecture for predictive diagnostic planning.',
    challenge: 'Spawning 100+ autonomous passenger agents navigating airport checkpoints while computing dynamic fire spread grids triggered severe pathfinding bottlenecks, while standard navigation models completely ignored human panic friction.',
    architecture: 'Engineered decentralized Unity agent AI utilizing custom Finite State Machines (FSMs) and sensory raycasting. Implemented A* rerouting triggered on-demand via peer-to-peer "Information Cascades" upon local hazard detection, bypassing constant path recalculation.',
    tradeoff: 'On-demand path recalculation reduced CPU pathfinding overhead by 68%, resolving frame spikes. Adaptive perception-driven AI achieved a 100% agent survival rate by dynamically bypassing fire blocks, compared to just 42% in static routing layouts.',
    youtube: '2A2KRqsTGFw',
    codeTitle: 'PassengerAI.cs',
    codeLanguage: 'csharp',
    codeSnippet: `using System;

public class PassangerAI : MonoBehaviour
{
    public float detectionRadius = 30f;
    public float visionAngle = 90f;
    public LayerMask obstacleLayer;
    public float communicationRadius = 10f;
    
    private List<Vector3> _knownHazards = new List<Vector3>();
    private HashSet<Checkpoint> _invalidatedExits = new HashSet<Checkpoint>();
    private bool _isEvacuating = false;
    private NavMeshAgent _agent;

    private static Dictionary<int, List<PassangerAI>> _agentGrid = new Dictionary<int, List<PassangerAI>>();
    private const float GridCellSize = 5.0f;
    private int _currentGridKey = -1;

    void Awake() => _agent = GetComponent<NavMeshAgent>();

    void Update()
    {
        UpdateSpatialGrid();
        PerformSensoryCheck();
        CommunicateWithNearbyAgents();
        
        if (_isEvacuating) HandleEvacuationLogic();
    }

    private void UpdateSpatialGrid()
    {
        int newKey = (Mathf.FloorToInt(transform.position.x / GridCellSize) * 1000) + Mathf.FloorToInt(transform.position.z / GridCellSize);
        if (newKey == _currentGridKey) return;

        if (_currentGridKey != -1 && _agentGrid.ContainsKey(_currentGridKey)) _agentGrid[_currentGridKey].Remove(this);
        if (!_agentGrid.ContainsKey(newKey)) _agentGrid[newKey] = new List<PassangerAI>();
        
        _agentGrid[newKey].Add(this);
        _currentGridKey = newKey;
    }

    private void PerformSensoryCheck()
    {
        foreach (var firePos in FireInstance.AllFirePositions) 
        {
            if (CanSeeHazard(firePos) && !_knownHazards.Contains(firePos))
            {
                _knownHazards.Add(firePos);
                InvalidateExitsBehindHazard(firePos);
                _isEvacuating = true;
                FindSafestExit();
            }
        }
    }

    private void InvalidateExitsBehindHazard(Vector3 hazardPos)
    {
        // This simulates agents realizing an exit is blocked by fire
        foreach (var exit in Checkpoint.AllExits)
        {
            Vector3 agentToExit = (exit.transform.position - transform.position);
            Vector3 agentToHazard = (hazardPos - transform.position);
            
            if (agentToHazard.magnitude < agentToExit.magnitude * 1.1f) {
                if (Vector3.Dot(agentToHazard.normalized, agentToExit.normalized) > 0.5f) 
                    _invalidatedExits.Add(exit);
            }
        }
    }

    private bool CanSeeHazard(Vector3 targetPos)
    {
        float dist = Vector3.Distance(transform.position, targetPos);
        if (dist < 5f) return true; 

        float angle = Vector3.Angle(transform.forward, (targetPos - transform.position).normalized);
        if (dist < detectionRadius && angle < visionAngle * 0.5f)
        {
            return !Physics.Linecast(transform.position + Vector3.up * 1.5f, targetPos + Vector3.up * 0.5f, obstacleLayer);
        }
        return false;
    }

    private void CommunicateWithNearbyAgents()
    {
        int cellX = Mathf.FloorToInt(transform.position.x / GridCellSize);
        int cellZ = Mathf.FloorToInt(transform.position.z / GridCellSize);

        for (int x = -1; x <= 1; x++) {
            for (int z = -1; z <= 1; z++) {
                int key = ((cellX + x) * 1000) + (cellZ + z);
                if (_agentGrid.TryGetValue(key, out var neighbors)) {
                    foreach (var neighbor in neighbors) {
                        if (neighbor == this || Vector3.Distance(transform.position, neighbor.transform.position) > communicationRadius) continue;
                        
                        bool learned = false;
                        foreach (var hazard in _knownHazards) {
                            if (!neighbor._knownHazards.Contains(hazard)) {
                                neighbor._knownHazards.Add(hazard);
                                neighbor.InvalidateExitsBehindHazard(hazard);
                                learned = true;
                            }
                        }
                        if (learned) neighbor._isEvacuating = true;
                    }
                }
            }
        }
    }

    private void HandleEvacuationLogic()
    {
        if (_agent.hasPath && IsPathSafe(_agent.path)) return;
        FindSafestExit();
    }

    private bool IsPathSafe(NavMeshPath path)
    {
        if (path.status != NavMeshPathStatus.PathComplete) return false;
        
        for (int i = 0; i < path.corners.Length - 1; i++) {
            Vector3 start = path.corners[i]; 
            Vector3 end = path.corners[i + 1];
            int samples = Mathf.Max(1, Mathf.CeilToInt(Vector3.Distance(start, end) / 3.0f)); 
            
            for (int j = 0; j <= samples; j++) {
                Vector3 sample = Vector3.Lerp(start, end, (float)j / samples);
                if (FireInstance.AllFirePositions.Any(f => (sample - f).sqrMagnitude < 36.0f)) return false;
            }
        }
        return true;
    }

    private void FindSafestExit()
    {
        var validExits = Checkpoint.AllExits
            .Where(e => !_invalidatedExits.Contains(e))
            .OrderBy(e => Vector3.Distance(transform.position, e.transform.position));

        foreach (var exit in validExits) {
            NavMeshPath path = new NavMeshPath();
            if (_agent.CalculatePath(exit.transform.position, path) && IsPathSafe(path)) {
                _agent.SetPath(path);
                return;
            }
        }
    }
}

    private void InitializeAirportCheckpointRoute()
    {
        // Setup initial waypoints: Spawning -> Baggage Claim -> Customs -> Terminal Checkpoint
        routeCheckpoints.Add(new Vector3(-45f, 0f, 12f));
        routeCheckpoints.Add(new Vector3(-12f, 0f, 40f));
        routeCheckpoints.Add(new Vector3(25f, 0f, -8f));
        
        if (routeCheckpoints.Count > 0)
        {
            navAgent.SetDestination(routeCheckpoints[0]);
        }
    }
}`
  },
  {
    title: 'OOP SHOWCASE',
    fullTitle: 'Peter Defeater (OOP)',
    year: '2025',
    isTech: true,
    bg: peterCard,
    description: '2D top-down shooter (Unity/C#) built as an academic showcase for strict OOP methodologies. Features modular weapon systems, hierarchical AI, and clean data encapsulation for code reusability.',
    learned: 'Deep dive into advanced software architecture. Learned to separate core logic from standard MonoBehaviours, building robust hierarchies where new content can be added with minimal friction.',
    done: 'Core Technical Contributions:\n- Designed polymorphic weapon architecture using custom base classes.\n- Architected modular enemy framework with hierarchical AI behaviors.\n- Implemented Enum-based state machines and Physics2D raycast detection.\n- Enforced strict encapsulation and clean code principles throughout.',
    summary: 'Developed a scalable OOP-driven architecture in Unity, featuring a polymorphic weapon system, hierarchical AI frameworks for diverse enemy behaviors, and dynamic loot systems, all built on strict encapsulation principles for high code reusability and long-term maintainability.',
    challenge: 'Standard Unity game scripts often couple gameplay logic directly to MonoBehaviours, causing tightly bound, rigid classes that break under scope updates and make scaling enemy/weapon systems highly prone to bugs.',
    architecture: 'Architected a robust framework around the four pillars of OOP: Abstraction via interfaces (IDamageable), Encapsulation of core entity data, Inheritance for hierarchical entity management (Entity -> CombatEnemy), and Polymorphism for specialized behavior overrides.',
    tradeoff: 'Decoupling reduced codebase dependencies by 75%. Adding new modular weapons and enemy types was reduced from hours of debugging to minutes, requiring only a single subclass declaration with zero regression risks.',
    youtube: '6YwtFNX7aBQ',
    codeTitle: 'OOP Showcase Code Snippet',
    codeLanguage: 'csharp',
    codeSnippet: `using System;
using System;
using UnityEngine;

namespace PeterDefeater.Portfolio
{
    /// <summary>
    /// ABSTRACTION: Interface defining what it means to be damageable.
    /// Any class implementing this must provide logic for TakeDamage.
    /// </summary>
    public interface IDamageable
    {
        void TakeDamage(int damage);
        bool IsDead { get; }
    }

    /// <summary>
    /// ENCAPSULATION & INHERITANCE: Abstract base class for all living things.
    /// It encapsulates health logic and provides a foundation for derived entities.
    /// </summary>
    public abstract class Entity : MonoBehaviour, IDamageable
    {
        // ENCAPSULATION: Private field with a public property (Getter only)
        [SerializeField] private int _maxHealth = 100;
        private int _currentHealth;

        public int CurrentHealth => _currentHealth;
        public bool IsDead => _currentHealth <= 0;

        protected virtual void Start()
        {
            _currentHealth = _maxHealth;
        }

        // POLYMORPHISM: Virtual method that can be overridden by subclasses
        public virtual void TakeDamage(int damage)
        {
            if (IsDead) return;

            _currentHealth = Math.Max(0, _currentHealth - damage);
            Debug.Log($"{gameObject.name} took {damage} damage. HP: {_currentHealth}");

            if (IsDead)
            {
                Die();
            }
        }

        // ABSTRACTION: Subclasses MUST implement their own death logic
        protected abstract void Die();
    }

    /// <summary>
    /// INHERITANCE & POLYMORPHISM: Specific implementation of an Enemy.
    /// Inherits shared logic from Entity and provides specific behaviors.
    /// </summary>
    public class CombatEnemy : Entity
    {
        [Header("Enemy Settings")]
        [SerializeField] private float _moveSpeed = 5f;
        [SerializeField] private GameObject _deathVFX;

        // POLYMORPHISM: Overriding the abstract Die method from the base class
        protected override void Die()
        {
            Debug.Log("Enemy has fallen!");
            
            if (_deathVFX != null)
            {
                Instantiate(_deathVFX, transform.position, Quaternion.identity);
            }

            Destroy(gameObject);
        }

        // POLYMORPHISM: Overriding TakeDamage to add a "shield" or "armor" mechanic
        public override void TakeDamage(int damage)
        {
            // Example of specialized logic: Enemies take 20% less damage
            int mitigatedDamage = Mathf.RoundToInt(damage * 0.8f);
            base.TakeDamage(mitigatedDamage);
        }

        private void Update()
        {
            if (!IsDead)
            {
                PerformAIBehavior();
            }
        }

        private void PerformAIBehavior()
        {
            // Basic AI logic...
        }
    }

    /// <summary>
    /// COMPOSITION: A separate class to handle combat interactions,
    /// demonstrating how to interact with the IDamageable abstraction.
    /// </summary>
    public class CombatSystem : MonoBehaviour
    {
        public void Attack(IDamageable target, int damage)
        {
            // We don't need to know IF the target is an Enemy or Player,
            // we just need to know it is IDamageable (Polymorphism).
            target.TakeDamage(damage);
        }
    }
}

`
  },
  {
    title: 'SHADER PROGRAMMING',
    isTech: true,
    bg: shaderBg,
    description: 'A real-time cinematic "Demon Eye" shader developed as a pre-production prototype on Shadertoy. Designed to create an oppressive environment, this project features a reactive, procedurally generated ocular system with pulsing veins, complex iris fibers, and a dynamic pupil.',
    learned: 'GLSL, Ray-Sphere Intersection Math, Procedural Noise (Slit-Pupil), Spherical UV Mapping, Specular Blending, Unreal Engine 5 (Custom HLSL).',
    done: 'Engineered a multi-layered procedural eye utilizing spherical raytracing and warped trigonometric fibers. Developed a dynamic pupil system that reacts to distance, subsequently porting the entire logic into Unreal Engine 5 using custom HLSL nodes for production.',
    summary: 'A technical deep-dive into procedural biological rendering. This shader replaces heavy 3D meshes and 4K textures with pure GPU math, achieving infinite resolution for cinematic close-ups of magical entities with pulsing veins and dynamic dilation.',
    challenge: 'Rendering high-fidelity, reactive eyes for cinematic characters usually requires complex textures and high-poly geometry, which lack true mathematical resolution for macro shots and are expensive to animate.',
    architecture: 'Bypassed the standard rendering pipeline by offloading the entire ocular geometry and shading to a single pixel shader. Used ray-sphere intersection math and spherical UV mapping to render all detail entirely through procedural math.',
    tradeoff: 'By using procedural math instead of textures, memory overhead was reduced to zero. The shader provides infinite detail for macro shots while running at maximum frame rates with minimal GPU overhead.',
    youtube: 'BtiMmb95DH4',
    codeTitle: 'Pre-Production Prototype (Shadertoy GLSL)',
    codeLanguage: 'hlsl',
    codeSnippet: `// Pre-production prototype developed in GLSL on Shadertoy.
// Ported to HLSL for Unreal Engine 5 production.

#define saturate(x) clamp(x, 0.0, 1.0)

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{ 
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    
    vec3 ro = vec3(0.0, 0.0, 3.0);       // Ray Origin (Equivalent to CameraWS)
    vec3 rd = normalize(vec3(uv, -1.0)); // Ray Direction
    vec3 SphereCenter = vec3(0.0, 0.0, 0.0);
    
    float EyeRadius = 1.0;
    float PupilSize = 1.0;
    float IrisSize = 1.0;
    float TimeVal = iTime;

    vec4 FinalColor = vec4(0.0);

    float camDist = length(ro - SphereCenter);
    float slitFactor = mix(4.0, 1.0, smoothstep(1.0, 5.0, camDist));
    float DynamicPupilSize = PupilSize * mix(0.6, 1.0, smoothstep(1.0, 9.0, camDist));

    vec3 oc = ro - SphereCenter;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - (EyeRadius * EyeRadius);
    float h = b * b - c;

    if (h < 0.0) {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0); 
        return; 
    }

    float hitDistance = -b - sqrt(h);
    if (hitDistance < 0.0) hitDistance = -b + sqrt(h);
    if (hitDistance < 0.0) {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return; 
    }

    vec3 p = ro + rd * hitDistance;

    vec3 Normal = normalize(p - SphereCenter);
    vec3 Forward = normalize(ro - SphereCenter);
    
    vec3 WorldUp = vec3(0.0, 1.0, 0.0); 

    if (abs(dot(Forward, WorldUp)) > 0.99) {
        WorldUp = vec3(1.0, 0.0, 0.0);
    }

    vec3 Right = normalize(cross(WorldUp, Forward));
    vec3 Up = normalize(cross(Forward, Right));
    vec3 EyeSpaceNormal = vec3(dot(Normal, Right), dot(Normal, Up), dot(Normal, Forward));

    float radius = acos(EyeSpaceNormal.z); 
    float angle = atan(EyeSpaceNormal.y, EyeSpaceNormal.x); 

    // --- 1. SCLERA ---
    vec3 ScleraBase = vec3(0.95, 0.95, 0.95);
    float veinDistortion = sin(radius * 15.0) + cos(angle * 10.0);
    float veinPattern = sin(angle * 40.0 + veinDistortion * 3.0);

    float veinThrob = 0.85 + sin(TimeVal * 4.0) * 0.05; 
    float veins = smoothstep(veinThrob, 1.0, veinPattern); 

    float veinMask = smoothstep(0.28 * IrisSize, 0.8, radius);
    vec3 VeinColor = vec3(0.7, 0.1, 0.1); 
    vec3 ScleraFinal = mix(ScleraBase, VeinColor, veins * veinMask);

    // --- 2. IRIS ---
    float waveWarp = sin(radius * 50.0) * 0.08 + cos(angle * 15.0) * 0.03;
    float warpedAngle = angle + waveWarp;

    float fiber1 = sin(warpedAngle * 45.0) * 0.5 + 0.5;
    float fiber2 = sin((angle - waveWarp) * 90.0) * 0.5 + 0.5;

    float collaretteJitter = sin(angle * 20.0) * 0.02;
    float collaretteRadius = 0.16 * IrisSize + collaretteJitter;

    vec3 IrisInner = vec3(0.85, 0.4, 1.0); 
    vec3 IrisOuter = vec3(0.15, 0.0, 0.4); 

    vec3 IrisBaseColor = mix(IrisInner, IrisOuter, smoothstep(0.1 * IrisSize, 0.3 * IrisSize, radius));

    float depthShadow = smoothstep(0.0, 0.06, abs(radius - collaretteRadius));
    vec3 IrisFinal = IrisBaseColor * mix(fiber1, fiber2, 0.5) * (0.4 + 0.6 * depthShadow);

    float limbalRing = smoothstep(0.26 * IrisSize, 0.3 * IrisSize, radius);
    IrisFinal = mix(IrisFinal, vec3(0.05, 0.0, 0.15), limbalRing);

    // --- 3. PUPIL ---
    vec2 pupilUV = vec2(EyeSpaceNormal.x * slitFactor, EyeSpaceNormal.y);
    float pupilDist = length(pupilUV);

    float pupilAO = smoothstep(0.06 * DynamicPupilSize, 0.1 * DynamicPupilSize, pupilDist);
    vec3 PupilFinal = mix(vec3(0.0, 0.0, 0.0), vec3(0.08, 0.02, 0.15), pupilAO);

    // --- MIXING ---
    float isIris = 1.0 - smoothstep(0.29 * IrisSize, 0.3 * IrisSize, radius); 
    float isPupil = 1.0 - smoothstep(0.09 * DynamicPupilSize, 0.1 * DynamicPupilSize, pupilDist);

    vec3 EyeColor = ScleraFinal;
    EyeColor = mix(EyeColor, IrisFinal, isIris);
    EyeColor = mix(EyeColor, PupilFinal, isPupil);

    float softShadow = smoothstep(-0.2, 1.0, EyeSpaceNormal.z);

    // --- 4. WET CORNEA SPECULAR ---
    vec3 LightDir = normalize(vec3(0.5, 0.5, 0.8));
    vec3 ViewDir = normalize(ro - p);
    vec3 HalfDir = normalize(LightDir + ViewDir);

    float specPrimary = pow(max(dot(Normal, HalfDir), 0.0), 250.0) * 0.85;
    float specSecondary = pow(max(dot(Normal, HalfDir), 0.0), 40.0) * 0.15;
    vec3 WetGlint = vec3(1.0, 1.0, 1.0) * (specPrimary + specSecondary);

    FinalColor.rgb = (EyeColor * softShadow) + WetGlint;
    FinalColor.a = 1.0; 

    fragColor = saturate(FinalColor);
}`
  }
]

const scrollToSection = (index) => {
  if (index < 0 || index >= sections.length || (isAutoScrolling.value && index === currentIndex.value)) return

  currentIndex.value = index
  isAutoScrolling.value = true

  const target = document.getElementById(sections[index].id)
  if (target) {
    const viewportHeight = window.innerHeight
    const targetHeight = target.offsetHeight
    
    // If the section is taller than the viewport, snap to its top edge.
    // Otherwise, center it in the viewport.
    const scrollToY = targetHeight > viewportHeight
      ? target.offsetTop
      : target.offsetTop - (viewportHeight - targetHeight) / 2

    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: scrollToY, autoKill: false },
      ease: 'expo.out',
      overwrite: 'auto',
      onComplete: () => {
        isAutoScrolling.value = false
      }
    })
  }

  history.pushState(null, null, `#${sections[index].id}`)
}

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 1024
}

const scrollCooldown = ref(false)
let lastScrollTime = 0

const handleWheel = (e) => {
  // Hard lock: stop all native and snap scrolling if modal is open
  if (isGlobalModalOpen.value) {
    if (e.target.closest('.project-modal')) return
    e.preventDefault()
    return
  }

  // Prevent scrolling for a brief moment after modal closes to absorb momentum
  if (scrollCooldown.value) {
    e.preventDefault()
    return
  }

  if (isTouchDevice()) return // Disable wheel snapping on mobile/tablet viewports

  const now = Date.now()

  // Dynamic Scroll Hijack Bypass: Allow normal scrolling inside the tall 'about' section
  if (sections[currentIndex.value].id === 'about') {
    const target = document.getElementById('about')
    if (target) {
      const isAtTop = window.scrollY <= target.offsetTop + 5
      
      // Allow native scroll down within the about section
      if (e.deltaY > 0) {
        return
      }
      
      // Allow native scroll up if not yet at the top boundary
      if (e.deltaY < 0 && !isAtTop) {
        return
      }
      
      // Snap up to previous section only when reaching the top boundary and scrolling up again
      if (e.deltaY < 0 && isAtTop) {
        e.preventDefault()
        if (isAutoScrolling.value || now - lastScrollTime < 1200) return
        scrollToSection(currentIndex.value - 1)
        lastScrollTime = now
        return
      }
    }
  }

  e.preventDefault()
  if (isAutoScrolling.value || now - lastScrollTime < 1200) return

  if (e.deltaY > 0) {
    scrollToSection(currentIndex.value + 1)
    lastScrollTime = now
  } else if (e.deltaY < 0) {
    scrollToSection(currentIndex.value - 1)
    lastScrollTime = now
  }
}

const gamesCarousel = ref(null)
const techCarousel = ref(null)

const handleKeyDown = (e) => {
  if (isGlobalModalOpen.value) {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'].includes(e.code)) {
      e.preventDefault()
    }
    return
  }

  // Horizontal Carousel Navigation (Left/Right Arrows)
  if (e.key === 'ArrowRight') {
    if (sections[currentIndex.value].id === 'games' && gamesCarousel.value) {
      gamesCarousel.value.next()
      return
    }
    if (sections[currentIndex.value].id === 'technical-projects' && techCarousel.value) {
      techCarousel.value.next()
      return
    }
  }
  if (e.key === 'ArrowLeft') {
    if (sections[currentIndex.value].id === 'games' && gamesCarousel.value) {
      gamesCarousel.value.prev()
      return
    }
    if (sections[currentIndex.value].id === 'technical-projects' && techCarousel.value) {
      techCarousel.value.prev()
      return
    }
  }

  // Enter Key: Trigger click (open modal) on active project
  if (e.key === 'Enter') {
    if (sections[currentIndex.value].id === 'games' && gamesCarousel.value) {
      gamesCarousel.value.triggerClick()
      return
    }
    if (sections[currentIndex.value].id === 'technical-projects' && techCarousel.value) {
      techCarousel.value.triggerClick()
      return
    }
  }

  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'].includes(e.code)) {
    if (isTouchDevice()) return

    e.preventDefault()
    if (isAutoScrolling.value) return
    if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
      scrollToSection(currentIndex.value + 1)
    } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
      scrollToSection(currentIndex.value - 1)
    }
  }
}

// Reactively lock the body to prevent middle-click scrolling and all other native scroll methods
watch(isGlobalModalOpen, (isOpen) => {
  if (isOpen) {
    if (window.innerWidth <= 1024) {
      // Animated alignment for mobile: smoothly center the section before locking the body
      const target = document.getElementById(sections[currentIndex.value].id)
      if (target) {
        const viewportHeight = window.innerHeight
        const targetHeight = target.offsetHeight
        const scrollToY = target.offsetTop - (viewportHeight - targetHeight) / 2

        gsap.to(window, {
          duration: 0.4, // Matches modal fade-in time
          scrollTo: { y: scrollToY, autoKill: false },
          ease: 'power2.out',
          onComplete: () => {
            document.body.style.overflow = 'hidden'
            document.body.style.touchAction = 'none'
          }
        })
      } else {
        document.body.style.overflow = 'hidden'
        document.body.style.touchAction = 'none'
      }
    } else {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    }
  } else {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''

    // Add scroll cooldown to prevent momentum scrolling from triggering section snap immediately after modal close
    scrollCooldown.value = true
    setTimeout(() => {
      scrollCooldown.value = false
    }, 600)
  }
}, { immediate: true })

const updateIndexOnScroll = () => {
  if (isAutoScrolling.value) return

  const scrollPos = window.scrollY + window.innerHeight / 2
  const newIndex = sections.findIndex((section) => {
    const el = document.getElementById(section.id)
    if (!el) return false
    return scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight
  })

  if (newIndex !== -1 && newIndex !== currentIndex.value) {
    currentIndex.value = newIndex
    history.replaceState(null, null, `#${sections[newIndex].id}`)
  }
}

const handleMouseDown = (e) => {
  if (e.button === 1) e.preventDefault()
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

  gsap.from('.hero__content', {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out'
  })

  gsap.from('.section__header', {
    scrollTrigger: {
      trigger: '.projects',
      start: 'top 80%'
    },
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out'
  })

  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('keydown', handleKeyDown, { passive: false })
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('scroll', updateIndexOnScroll)

  const hash = window.location.hash.replace('#', '')
  if (hash) {
    const index = sections.findIndex(s => s.id === hash)
    if (index !== -1) {
      currentIndex.value = index
      const target = document.getElementById(hash)
      if (target) {
        window.scrollTo(0, target.offsetTop)
      }
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('scroll', updateIndexOnScroll)
})
</script>

<template>
  <main class="portfolio-main">
    <PortfolioNav
      :sections="sections"
      :current-index="currentIndex"
      @navigate="scrollToSection"
    />

    <PortfolioHero />

    <PortfolioCarousel
      id="games"
      ref="gamesCarousel"
      label="GAME PROJECTS"
      title="Games Showcase"
      :items="games"
    />

    <PortfolioCarousel
      id="technical-projects"
      ref="techCarousel"
      label="TECHNICAL PROJECTS"
      title="Technical Projects"
      :items="techProjects"
    />

    <PortfolioAbout />
  </main>
</template>

<style scoped>
.portfolio-main {
  min-height: 100vh;
  overflow: visible;
}
</style>
