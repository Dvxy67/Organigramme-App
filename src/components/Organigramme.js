import React, { useMemo, useState } from 'react';
import { organigrammeData } from '../data/organigrammeData';

const CARD_WIDTH = 280;
const CARD_GAP = 48;

const DEPARTMENT_THEMES = {
  Direction: { className: 'theme-direction' },
  'Ressources Humaines': { className: 'theme-hr' },
  Informatique: { className: 'theme-it' },
  Commercial: { className: 'theme-sales' },
  Finance: { className: 'theme-finance' },
  Opérations: { className: 'theme-operations' },
  Support: { className: 'theme-support' },
  default: { className: 'theme-generic' },
};

const getDepartmentTheme = (department) => {
  if (department && DEPARTMENT_THEMES[department]) {
    return DEPARTMENT_THEMES[department].className;
  }
  return DEPARTMENT_THEMES.default.className;
};

const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const collectDepartments = (node, set) => {
  if (!node) return;
  if (node.department) {
    set.add(node.department);
  }
  if (node.children) {
    node.children.forEach((child) => collectDepartments(child, set));
  }
};

const ConnectionLine = () => (
  <div className="connection-line" aria-hidden="true" />
);

const HorizontalLine = ({ count, width }) => {
  if (count <= 1) {
    return null;
  }

  const startOffset = CARD_WIDTH / 2;
  const lineWidth = (count - 1) * (CARD_WIDTH + CARD_GAP);

  return (
    <div
      className="horizontal-connector"
      style={{ width: `${width}px` }}
      aria-hidden="true"
    >
      <div
        className="horizontal-connector-bar"
        style={{ left: `${startOffset}px`, width: `${lineWidth}px` }}
      />
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className="horizontal-connector-tick"
          style={{ left: `${startOffset + index * (CARD_WIDTH + CARD_GAP)}px` }}
        />
      ))}
    </div>
  );
};

const EmployeeCard = ({ node, isRoot, onToggle, isCollapsed, hasChildren }) => {
  const [isHovered, setIsHovered] = useState(false);
  const themeClass = getDepartmentTheme(node.department);
  const initials = getInitials(node.name);

  return (
    <div className="employee-card-wrapper">
      <div
        className={`employee-card ${themeClass} ${isRoot ? 'director-card' : ''} ${
          isHovered ? 'is-hovered' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`role-badge ${themeClass}`}>{node.role}</div>

        <div className="employee-top">
          <div className={`employee-avatar ${themeClass}`}>{initials}</div>
          <div className="employee-info">
            <h3 className="employee-name">{node.name}</h3>
            <p className="employee-role">{node.role}</p>
          </div>
        </div>

        <div className="employee-details">
          {node.department && (
            <p className="employee-department">
              <span>Département :</span> {node.department}
            </p>
          )}
          {node.focus && <p className="employee-focus">{node.focus}</p>}
        </div>

        {hasChildren && (
          <button
            type="button"
            className={`collapse-button ${isRoot ? 'collapse-director' : themeClass}`}
            onClick={onToggle}
            aria-label={isCollapsed ? 'Développer la section' : 'Réduire la section'}
          >
            {isCollapsed ? '+' : '–'}
          </button>
        )}
      </div>
    </div>
  );
};

const TreeNode = ({ node, isRoot = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const children = node.children ?? [];
  const hasChildren = children.length > 0;

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const rowWidth = hasChildren
    ? children.length * CARD_WIDTH + (children.length - 1) * CARD_GAP
    : 0;

  return (
    <div className="tree-node">
      <EmployeeCard
        node={node}
        isRoot={isRoot}
        onToggle={handleToggle}
        isCollapsed={isCollapsed}
        hasChildren={hasChildren}
      />

      {hasChildren && !isCollapsed && (
        <>
          <ConnectionLine />
          {children.length === 1 ? (
            <TreeNode node={children[0]} />
          ) : (
            <>
              <HorizontalLine count={children.length} width={rowWidth} />
              <div
                className="tree-children"
                style={{
                  width: `${rowWidth}px`,
                  gridTemplateColumns: `repeat(${children.length}, ${CARD_WIDTH}px)`,
                  columnGap: `${CARD_GAP}px`,
                }}
              >
                {children.map((child) => (
                  <TreeNode key={child.id || child.name} node={child} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

const Legend = ({ departments }) => (
  <div className="chart-legend">
    <h3>Légende des départements</h3>
    <div className="legend-grid">
      {departments.map((department) => {
        const themeClass = getDepartmentTheme(department);
        return (
          <div key={department} className="legend-item">
            <span className={`legend-color ${themeClass}`} aria-hidden="true" />
            <span className="legend-label">{department}</span>
          </div>
        );
      })}
    </div>
  </div>
);

const Organigramme = () => {
  const departments = useMemo(() => {
    const set = new Set();
    collectDepartments(organigrammeData, set);
    return Array.from(set);
  }, []);

  return (
    <div className="org-chart-page">
      <div className="chart-header">
        <h1>Organigramme de l'entreprise</h1>
        <h2>Structure hiérarchique & départements</h2>
        <p className="chart-tip">
          💡 Cliquez sur les boutons pour afficher ou masquer les équipes.
        </p>
      </div>

      <div className="chart-wrapper">
        <div className="chart-scroll">
          <TreeNode node={organigrammeData} isRoot />
        </div>
      </div>

      <Legend departments={departments} />
    </div>
  );
};

export default Organigramme;
