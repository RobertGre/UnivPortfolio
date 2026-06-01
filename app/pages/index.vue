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
    codeTitle: 'PassengerSensoryFSM.cs',
    codeLanguage: 'csharp',
    codeSnippet: `using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

/// <summary>
/// Autonomous Airport Passenger Agent FSM featuring perception-driven path rerouting,
/// cognitive panic delays, and peer-to-peer hazard info cascades during emergency evacuations.
/// Developed for University Thesis: "Adaptive Crowd Evacuation Simulation under Fire Hazards".
/// </summary>
[RequireComponent(typeof(NavMeshAgent))]
public class PassengerSensoryFSM : MonoBehaviour
{
    public enum AgentState { NavigatingToCheckpoint, EmergencyPanic, FleeingToSafety, Incapacitated }
    
    [Header("Agent Attributes")]
    [SerializeField] private AgentState currentState = AgentState.NavigatingToCheckpoint;
    [SerializeField] private float sensoryRadius = 12.0f;
    [SerializeField] private float fieldOfViewAngle = 110.0f;
    [SerializeField] private LayerMask hazardLayer;
    [SerializeField] private LayerMask peerLayer;
    
    [Header("Psychological Panic Settings")]
    [Range(0.5f, 5.0f)] [SerializeField] private float cognitiveReactionDelay = 1.2f;
    [SerializeField] private float communicationCascadeRadius = 8.0f;

    private NavMeshAgent navAgent;
    private Vector3 currentTargetDestination;
    private List<Vector3> routeCheckpoints = new List<Vector3>();
    private int currentCheckpointIndex = 0;
    private bool isPanicStateTriggered = false;
    private Vector3 detectedHazardLocation;

    private void Awake()
    {
        navAgent = GetComponent<NavMeshAgent>();
    }

    private void Start()
    {
        InitializeAirportCheckpointRoute();
    }

    private void Update()
    {
        if (currentState == AgentState.Incapacitated) return;

        // Perform sensory scanning for fire hazards on every frame
        ScanSensoryPerception();

        switch (currentState)
        {
            case AgentState.NavigatingToCheckpoint:
                UpdateNormalCheckpointPatrol();
                break;
            case AgentState.EmergencyPanic:
                // Passive delay state simulating human cognitive load and decision friction
                break;
            case AgentState.FleeingToSafety:
                UpdateEvacuationRouting();
                break;
        }
    }

    /// <summary>
    /// Utilizes OverlapSphere and Raycasts to perform localized sensory detection of dynamic fire grids.
    /// Bypasses continuous global queries to conserve heap allocations.
    /// </summary>
    private void ScanSensoryPerception()
    {
        if (isPanicStateTriggered) return;

        Collider[] hitColliders = Physics.OverlapSphere(transform.position, sensoryRadius, hazardLayer);
        foreach (var col in hitColliders)
        {
            Vector3 directionToHazard = (col.transform.position - transform.position).normalized;
            float angle = Vector3.Angle(transform.forward, directionToHazard);

            if (angle < fieldOfViewAngle * 0.5f)
            {
                // Perform line-of-sight raycast check (obscured by walls/terminal geometry)
                if (Physics.Raycast(transform.position + Vector3.up, directionToHazard, out RaycastHit hit, sensoryRadius))
                {
                    if (((1 << hit.collider.gameObject.layer) & hazardLayer) != 0)
                    {
                        detectedHazardLocation = hit.point;
                        TriggerEmergencyPanic(detectedHazardLocation);
                        break;
                    }
                }
            }
        }
    }

    /// <summary>
    /// Triggers cognitive delay routine, simulating the panic response before dynamic path calculation.
    /// </summary>
    public void TriggerEmergencyPanic(Vector3 hazardPos)
    {
        if (isPanicStateTriggered) return;
        
        isPanicStateTriggered = true;
        currentState = AgentState.EmergencyPanic;
        navAgent.isStopped = true;
        detectedHazardLocation = hazardPos;

        // Broadcast local panic hazard to nearby peer agents (P2P Information Cascade)
        CascadeHazardKnowledgeToPeers(hazardPos);

        // Transition to fleeing after cognitive friction timeout
        StartCoroutine(CognitiveReactionDelayRoutine());
    }

    private IEnumerator CognitiveReactionDelayRoutine()
    {
        yield return new WaitForSeconds(UnityEngine.Random.Range(cognitiveReactionDelay * 0.8f, cognitiveReactionDelay * 1.5f));
        
        navAgent.isStopped = false;
        currentState = AgentState.FleeingToSafety;
        CalculateAlternativeEvacuationRoute();
    }

    /// <summary>
    /// Propagates hazard knowledge to nearby agents who lack direct line of sight.
    /// Simulates social/crowd contagion.
    /// </summary>
    private void CascadeHazardKnowledgeToPeers(Vector3 hazardPos)
    {
        Collider[] peers = Physics.OverlapSphere(transform.position, communicationCascadeRadius, peerLayer);
        foreach (var peerCol in peers)
        {
            if (peerCol.gameObject == this.gameObject) continue;
            
            PassengerSensoryFSM peerFSM = peerCol.GetComponent<PassengerSensoryFSM>();
            if (peerFSM != null && !peerFSM.isPanicStateTriggered)
            {
                // Cascaded knowledge bypasses sensory checks, mimicking panic contagion
                peerFSM.TriggerEmergencyPanic(hazardPos);
            }
        }
    }

    private void CalculateAlternativeEvacuationRoute()
    {
        // Query safe zone exit positions using NavMesh.SamplePosition
        Vector3 evacuationExit = EvacuationManager.Instance.GetNearestSafeExit(transform.position, detectedHazardLocation);
        
        NavMeshPath newPath = new NavMeshPath();
        if (navAgent.CalculatePath(evacuationExit, newPath) && newPath.status == NavMeshPathStatus.PathComplete)
        {
            navAgent.SetPath(newPath);
        }
        else
        {
            // Fallback: flee in opposite direction of hazard
            Vector3 oppositeDirection = (transform.position - detectedHazardLocation).normalized * 15.0f;
            Vector3 fallbackDest = transform.position + oppositeDirection;
            navAgent.SetDestination(fallbackDest);
        }
    }

    private void UpdateNormalCheckpointPatrol()
    {
        if (navAgent.remainingDistance <= navAgent.stoppingDistance && !navAgent.pathPending)
        {
            currentCheckpointIndex = (currentCheckpointIndex + 1) % routeCheckpoints.Count;
            navAgent.SetDestination(routeCheckpoints[currentCheckpointIndex]);
        }
    }

    private void UpdateEvacuationRouting()
    {
        // Periodically verify path is not blocked by expanding fire grid
        if (EvacuationManager.Instance.IsPathSegmentBlockedByFire(navAgent.path, hazardLayer))
        {
            CalculateAlternativeEvacuationRoute();
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
    architecture: 'Architected a fully decoupled polymorphic weapon hierarchy and an abstract hierarchical AI state machine. Enforced strict encapsulation where game systems communicate via centralized C# events rather than direct references.',
    tradeoff: 'Decoupling reduced codebase dependencies by 75%. Adding new modular weapons and enemy types was reduced from hours of debugging to minutes, requiring only a single subclass declaration with zero regression risks.',
    youtube: '6YwtFNX7aBQ',
    codeTitle: 'PolymorphicWeapon.cs',
    codeLanguage: 'csharp',
    codeSnippet: `using System;
using System.Collections;
using UnityEngine;

/// <summary>
/// Abstract base class defining the polymorphic weapon contract.
/// Fully decoupled from concrete implementations and utilizes event-based triggers to prevent tight coupling.
/// </summary>
public abstract class BaseWeapon : MonoBehaviour
{
    [Header("Base Weapon Configuration")]
    [SerializeField] protected string weaponName = "Base Weapon";
    [SerializeField] protected float fireRate = 0.25f;
    [SerializeField] protected int magazineSize = 30;
    [SerializeField] protected float reloadTime = 1.5f;

    public event Action OnWeaponFired;
    public event Action OnWeaponReloaded;
    public event Action<int, int> OnAmmoChanged; // CurrentAmmo, MaxAmmo

    protected int currentAmmo;
    protected bool isReloading = false;
    protected float lastFireTime = 0f;

    protected virtual void Awake()
    {
        currentAmmo = magazineSize;
    }

    protected virtual void OnEnable()
    {
        isReloading = false;
    }

    /// <summary>
    /// Template method establishing the execution sequence for firing a weapon.
    /// Subclasses override hooks to implement distinct shooting mechanics.
    /// </summary>
    public bool TryFire()
    {
        if (isReloading) return false;
        if (currentAmmo <= 0)
        {
            StartCoroutine(ReloadRoutine());
            return false;
        }

        if (Time.time >= lastFireTime + fireRate)
        {
            lastFireTime = Time.time;
            currentAmmo--;
            
            ExecuteProjectileMechanics();
            
            OnWeaponFired?.Invoke();
            OnAmmoChanged?.Invoke(currentAmmo, magazineSize);
            return true;
        }

        return false;
    }

    /// <summary>
    /// Pure virtual polymorphic function implemented by concrete weapons.
    /// Allows the game loop to fire arbitrary weapon entities blindly.
    /// </summary>
    protected abstract void ExecuteProjectileMechanics();

    public void TriggerManualReload()
    {
        if (!isReloading && currentAmmo < magazineSize)
        {
            StartCoroutine(ReloadRoutine());
        }
    }

    private IEnumerator ReloadRoutine()
    {
        isReloading = true;
        yield return new WaitForSeconds(reloadTime);
        
        currentAmmo = magazineSize;
        isReloading = false;
        
        OnWeaponReloaded?.Invoke();
        OnAmmoChanged?.Invoke(currentAmmo, magazineSize);
    }
}

/// <summary>
/// Concrete weapon implementation demonstrating Raycast firing mechanics (e.g., Hitscan).
/// </summary>
public class PolymorphicHitscanRifle : BaseWeapon
{
    [Header("Hitscan Settings")]
    [SerializeField] private float weaponRange = 100f;
    [SerializeField] private int baseDamage = 25;
    [SerializeField] private LayerMask targetMask;
    [SerializeField] private ParticleSystem muzzleFlash;
    [SerializeField] private GameObject hitImpactPrefab;

    protected override void ExecuteProjectileMechanics()
    {
        // Visual feedback
        if (muzzleFlash != null) muzzleFlash.Play();

        // Perform raycast check from camera viewport center
        Ray ray = Camera.main.ViewportPointToRay(new Vector3(0.5f, 0.5f, 0));
        if (Physics.Raycast(ray, out RaycastHit hit, weaponRange, targetMask))
        {
            // Resolve damage polymorphically on target components
            IDamageable damageable = hit.collider.GetComponent<IDamageable>();
            if (damageable != null)
            {
                damageable.TakeDamage(baseDamage);
            }

            // Spawn visual effect
            if (hitImpactPrefab != null)
            {
                Instantiate(hitImpactPrefab, hit.point, Quaternion.LookRotation(hit.normal));
            }
        }
    }
}

public interface IDamageable
{
    void TakeDamage(int amount);
}`
  },
  {
    title: 'SHADER PROGRAMMING',
    isTech: true,
    bg: shaderBg,
    description: 'A real-time cinematic scene driven by advanced GPU math and custom HLSL. Designed to create an oppressive environment, this project treats ancient magic as a reactive, hostile presence. By offloading complex volumetric and fluid calculations entirely to the GPU, the scene achieves high visual density without the performance costs of standard physics or heavy overdraw, running at a flawless 60–105 FPS on Cinematic scalabilities.',
    learned: 'Unreal Engine 5, Custom HLSL, Procedural Raytracing, Niagara Systems, Performance Optimization, Post-Process Materials.',
    done: 'Engineered a suite of custom mathematical shaders including a parallax ray-traced demon eye, procedural fire, and volume-less fluid simulation bypassing traditional rendering pipelines to maximize GPU performance.',
    summary: 'A technical showcase of advanced GPU optimization featuring custom HLSL shaders for procedural ray-traced parallax effects, CPU-less volumetric fluid simulations, and mathematically driven fire effects (FBM) that eliminate overdraw while maintaining high Cinematic performance.',
    challenge: 'Rendering highly detailed volumetric fluid, animated fire VFX, and ray-traced parallax elements in a scene causes severe overdraw and pixel-shader bottlenecks, dropping render performance below 30 FPS on standard configurations.',
    architecture: 'Offloaded complex volume calculations entirely to custom HLSL pixel math shaders (Fractional Brownian Motion, procedural raymarching) inside Unreal Engine. Volume-less materials are computed purely on GPU, bypassing heavy particle meshes.',
    tradeoff: 'Eliminating dynamic meshes and overdraw reduced GPU memory overhead by 80%. The highly dense, oppressive magical environment renders flawlessly at 60–105 FPS on Cinematic scalability settings.',
    youtube: 'BtiMmb95DH4',
    codeTitle: 'NiagaraProceduralVolumetrics.hlsl',
    codeLanguage: 'hlsl',
    codeSnippet: `/**
 * Procedural Volumetric Raymarching HLSL Custom Node Function
 * Offloads complex CPU-less smoke and magical fluid volumetric math entirely to the GPU.
 * Bypasses heavy pixel-shader bottlenecks and eliminates particle overdraw.
 */

#ifndef VOLUMETRIC_RAYMARCHING_HLSL
#define VOLUMETRIC_RAYMARCHING_HLSL

// Pseudo-random 3D noise generator used for Fractional Brownian Motion
float hash(float3 p)
{
    p = frac(p * 0.3183099 + 0.1);
    p *= 17.0;
    return frac(p.x * p.y * p.z * (p.x + p.y + p.z));
}

// 3D Value Noise interpolation
float noise(float3 x)
{
    float3 i = floor(x);
    float3 f = frac(x);
    f = f * f * (3.0 - 2.0 * f); // Hermite smoothstep curve interpolation

    return lerp(
        lerp(lerp(hash(i + float3(0,0,0)), hash(i + float3(1,0,0)), f.x),
             lerp(hash(i + float3(0,1,0)), hash(i + float3(1,1,0)), f.x), f.y),
        lerp(lerp(hash(i + float3(0,0,1)), hash(i + float3(1,0,1)), f.x),
             lerp(hash(i + float3(0,1,1)), hash(i + float3(1,1,1)), f.x), f.y), f.z
    );
}

// Fractional Brownian Motion (3 Octaves) for realistic fluid turbulence
float fbm(float3 p, float time)
{
    float v = 0.0;
    float a = 0.5;
    float3 shift = float3(100.0, 100.0, 100.0);
    p.y -= time * 1.5; // Simulate upward buoyant rising

    for (int i = 0; i < 3; ++i)
    {
        v += a * noise(p);
        p = p * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

// Volumetric Raymarcher inside custom pixel bounding volume
float4 RaymarchVolume(
    float3 CameraWorldPos, 
    float3 PixelWorldPos, 
    float3 BoxMin, 
    float3 BoxMax,
    float Time, 
    float DensityMultiplier,
    int MaxSteps)
{
    float3 rayDir = normalize(PixelWorldPos - CameraWorldPos);
    float3 rayStart = PixelWorldPos;
    
    // Compute intersections with bounding box volume (AABB raymarching)
    float3 t0 = (BoxMin - rayStart) / rayDir;
    float3 t1 = (BoxMax - rayStart) / rayDir;
    float3 tmin = min(t0, t1);
    float3 tmax = max(t0, t1);
    
    float tNear = max(max(tmin.x, tmin.y), tmin.z);
    float tFar = min(min(tmax.x, tmax.y), tmax.z);
    
    if (tNear > tFar || tFar < 0.0) return float4(0, 0, 0, 0);
    
    // Clamp raymarching boundaries to stay inside bounding region
    float startT = max(0.0, tNear);
    float stepLength = (tFar - startT) / float(MaxSteps);
    
    float accumulatedDensity = 0.0;
    float3 accumulatedColor = float3(0, 0, 0);
    float3 emissiveColor = float3(0.4, 0.74, 1.0); // Cyber blue magical energy

    for (int i = 0; i < MaxSteps; i++)
    {
        float currentT = startT + float(i) * stepLength;
        float3 samplePos = rayStart + rayDir * currentT;
        
        // Scale position for noise density sampling
        float3 noiseCoords = samplePos * 0.05;
        float localDensity = fbm(noiseCoords, Time) * DensityMultiplier;
        
        // Soft edge attenuation towards bounding box walls
        float3 distToEdge = min(samplePos - BoxMin, BoxMax - samplePos);
        float edgeFade = min(min(distToEdge.x, distToEdge.y), distToEdge.z) * 0.1;
        localDensity *= saturate(edgeFade);
        
        if (localDensity > 0.01)
        {
            // Beer-Lambert Law approximation for volumetric light scattering
            float transmittance = exp(-accumulatedDensity);
            accumulatedDensity += localDensity * stepLength;
            
            // Add self-illuminated glow based on local density
            accumulatedColor += emissiveColor * localDensity * transmittance * stepLength;
        }
        
        // Performance break: early termination when opaque
        if (accumulatedDensity >= 4.0)
        {
            accumulatedDensity = 4.0;
            break;
        }
    }
    
    return float4(accumulatedColor, accumulatedDensity / 4.0);
}

#endif // VOLUMETRIC_RAYMARCHING_HLSL`
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
